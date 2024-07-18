import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import FingerprintLogin from './FingerprintLogin';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showFingerprintLogin, setShowFingerprintLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        alert('Login failed: ' + error.reason);
      } else {
        const user = Meteor.user();
        if (user && user.profile && user.profile.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/employee-dashboard');
        }
      }
    });
  };

  const handleFingerprintLogin = () => {
    setShowFingerprintLogin(true);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Employee Check-In System</h1>
        <div className="relative mb-4">
          <input
            type="text"
            name="floating_username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="floating_username"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-500 text-white rounded-md mb-4"
        >
          Login
        </button>
        <button
          onClick={handleFingerprintLogin}
          className="w-full py-2 bg-green-500 text-white rounded-md mb-4"
        >
          Log in with Fingerprint
        </button>
        <button
          onClick={handleRegister}
          className="w-full py-2 bg-gray-500 text-white rounded-md"
        >
          Register
        </button>
      </div>
      {showFingerprintLogin && <FingerprintLogin />}
    </div>
  );
}
