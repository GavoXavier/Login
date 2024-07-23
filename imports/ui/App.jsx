import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import Home from './Home';
import Register from './Register';
import EmployeeDashboard from './EmployeeDashboard.jsx';

export function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
      </Routes>
    </Router>
  );
}
