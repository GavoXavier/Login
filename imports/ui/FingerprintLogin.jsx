import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default function FingerprintLogin() {
  const [status, setStatus] = useState('Place your Finger on the Scanner');
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    const checkFingerprintMatch = () => {
      fetch('/api/check-fingerprint-match-status')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data && data.success && data.token) {
            setStatus('Identified. Logging you in...');
            setTimeout(() => {
              Meteor.loginWithToken(data.token, (err) => {
                if (err) {
                  console.error('Login failed:', err);
                  setStatus('Login failed');
                } else {
                  setStatus('Login successful');
                  navigate(data.role === 'admin' ? '/admin' : '/employee-dashboard');
                }
              });
            }, 2000); // Wait for 2 seconds before proceeding
          } else {
            console.error('Error checking fingerprint match status:', data);
            setStatus('Error checking fingerprint match status');
          }
        })
        .catch(error => {
          console.error('Error checking fingerprint match status:', error);
          setStatus('Error checking fingerprint match status');
        });
    };

    interval = setInterval(checkFingerprintMatch, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <div>
      <p>{status}</p>
    </div>
  );
}
