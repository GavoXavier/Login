import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Employees } from './employees';

Meteor.methods({
  'checkLoginStatus'() {
    const userId = this.userId;
    return {
      isLoggedIn: !!userId,
      userId
    };
  }, 

  'employees.insert'(username, fullName, age, role, contact) {
    check(username, String);
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);

    if (Meteor.users.findOne({ username })) {
      throw new Meteor.Error('Username already exists');
    }

    // Create the user account
    const userId = Accounts.createUser({
      username,
      profile: {
        fullName,
        age,
        role,
        contact,
      },
    });

    Employees.insert({
      userId,
      username,
      fullName,
      age,
      role,
      contact,
      createdAt: new Date(),
    });
  },

  'employees.remove'(employeeId) {
    check(employeeId, String);

    const employee = Employees.findOne(employeeId);
    if (employee) {
      Meteor.users.remove(employee.userId);
      Employees.remove(employeeId);
    }
  },

  'employees.update'(employeeId, username, fullName, age, role, contact) {
    check(employeeId, String);
    check(username, String);
    check(fullName, String);
    check(age, Number);
    check(role, String);
    check(contact, String);

    const employee = Employees.findOne(employeeId);
    if (employee) {
      Meteor.users.update(employee.userId, {
        $set: {
          username,
          profile: { fullName, age, role, contact },
        },
      });

      Employees.update(employeeId, {
        $set: { username, fullName, age, role, contact },
      });
    }
  },
});
