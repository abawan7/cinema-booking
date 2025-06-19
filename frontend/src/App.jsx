import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css'
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: 'center', marginTop: 40 }}>
      <h2>Welcome to Cinema Booking!</h2>
      <div style={{ marginTop: 30 }}>
        <button style={{ marginRight: 10 }} onClick={() => navigate('/signin')}>Login</button>
        <button onClick={() => navigate('/signup')}>Register</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/bookings" element={<BookingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
