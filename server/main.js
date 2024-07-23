import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import bodyParser from 'body-parser';
import { Accounts } from 'meteor/accounts-base';
import { Buffer } from 'buffer';

const expectedUsername = 'your_username';
const expectedPassword = 'your_password';

WebApp.connectHandlers.use(bodyParser.json());

WebApp.connectHandlers.use('/api/fingerprint-match', (req, res, next) => {
  if (req.method === 'POST') {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Example"' });
      res.end('Unauthorized');
      return;
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    if (username !== expectedUsername || password !== expectedPassword) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Example"' });
      res.end('Unauthorized');
      return;
    }

    const { username: receivedUsername } = req.body;

    if (receivedUsername) {
      console.log(`Received username: ${receivedUsername}`);

      const user = Accounts.findUserByUsername(receivedUsername);

      if (user) {
        const stampedLoginToken = Accounts._generateStampedLoginToken();
        const hashStampedToken = Accounts._hashStampedToken(stampedLoginToken);

        Meteor.users.update(user._id, {
          $push: {
            'services.resume.loginTokens': hashStampedToken
          }
        });

        Meteor.call('storeToken', { userId: user._id, token: stampedLoginToken.token });

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, message: 'User not found' }));
      }
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'Username not provided' }));
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
  }
});

WebApp.connectHandlers.use('/api/check-fingerprint-match-status', (req, res, next) => {
  if (req.method === 'GET') {
    const tokenData = Meteor.call('retrieveToken');
    if (tokenData) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, ...tokenData }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, message: 'No token found' }));
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: false, message: 'Method not allowed' }));
  }
});

Meteor.startup(() => {
  if (!Accounts.findUserByUsername('Admin')) {
    Accounts.createUser({
      username: 'Admin',
      password: '1',
      profile: {
        role: 'admin',
        fullName: 'Administrator',
        age: 30,
        contact: '1234567890'
      }
    });
  }
});

Meteor.methods({
  'registerUser'({ username, fullName, age, contact, role }) {
    if (Accounts.findUserByUsername(username)) {
      throw new Meteor.Error('User already exists');
    }

    const userId = Accounts.createUser({
      username,
      password: 'password', // You can enhance this to set a real password
      profile: {
        role,
        fullName,
        age,
        contact
      }
    });

    return userId;
  },

  storeToken({ userId, token }) {
    global.fingerprintToken = { userId, token, role: 'employee' };
    const user = Meteor.users.findOne(userId);
    if (user && user.profile && user.profile.role) {
      global.fingerprintToken.role = user.profile.role;
    }
  },

  retrieveToken() {
    return global.fingerprintToken || null;
  },

  clearToken() {
    global.fingerprintToken = null; // Clear the token on logout
  }
});

Accounts.onLogout(() => {
  global.fingerprintToken = null; // Clear the token when any user logs out
});
