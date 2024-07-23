import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Meteor.logout((error) => {
      if (error) {
        alert('Logout failed: ' + error.reason);
      } else {
        navigate('/');
      }
    });
  };

  return (
    <div className="admin-dashboard flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
