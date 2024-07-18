import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default function Register() {
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [role, setRole] = useState('Employee');
  const navigate = useNavigate();

  const handleRegister = () => {
    const profile = { fullName, age, contact, role };
    Accounts.createUser({ username, password: 'password123', profile }, (error) => {
      if (error) {
        alert('Registration failed: ' + error.reason);
      } else {
        alert('Registration successful! You can now log in.');
        navigate('/');
      }
    });
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
        <div className="relative mb-4">
          <input
            type="text"
            name="floating_username"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="floating_username"
            className="absolute text-sm font-bold text-center mb-6 text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="floating_fullname"
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label
            htmlFor="floating_fullname"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Full Name
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="number"
            name="floating_age"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <label
            htmlFor="floating_age"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Age
          </label>
        </div>
        <div className="relative mb-4">
          <input
            type="text"
            name="floating_contact"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <label
            htmlFor="floating_contact"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Contact
          </label>
        </div>
        <div className="relative mb-4">
          <select
            name="floating_role"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-black appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
          <label
            htmlFor="floating_role"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Role
          </label>
        </div>
        <button
          onClick={handleRegister}
          className="w-full py-2 bg-blue-500 text-white rounded-md mb-4"
        >
          Register
        </button>
        <button
          onClick={handleBackToLogin}
          className="w-full py-2 bg-gray-500 text-white rounded-md"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
