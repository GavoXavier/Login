import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default function EmployeeDashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = Meteor.user();
    if (currentUser) {
      setUser(currentUser);
    } else {
      // Redirect to home if no user is logged in
      navigate('/');
    }
  }, []);

  const handleLogout = () => {
    Meteor.logout(() => {
      navigate('/');
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}</h1>
        <p className="text-lg mb-6">Full Name: {user.profile.fullName}</p>
        <button
          onClick={handleLogout}
          className="w-full py-2 bg-red-500 text-white rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
