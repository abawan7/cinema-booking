import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import './App.css'
import BookingPage from "./pages/BookingPage";
import Dashboard from "./pages/Dashboard";
import SelectSeats from './pages/SelectSeats';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  return (
    <div style={{ width: '100%', background: '#23243a', padding: '12px 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', position: 'fixed', top: 0, left: 0, zIndex: 100 }}>
      {isAuthenticated && (
        <>
          <span style={{ color: 'white', marginRight: 16, fontWeight: 500 }}>{userName}</span>
          <button onClick={handleLogout} style={{ background: '#e53e3e', color: 'white', border: 'none', padding: '8px 16px', borderRadius: 4, fontWeight: 600 }}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); // Ensure UI updates everywhere
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 60 }}>
      <h2>Welcome to Cinema Booking!</h2>
      <div style={{ marginTop: 30 }}>
        <button style={{ marginRight: 10 }} onClick={() => navigate('/signin')}>Login</button>
        <button style={{ marginRight: 10 }} onClick={() => navigate('/signup')}>Register</button>
        <button style={{ marginRight: 10 }} onClick={() => navigate('/bookings')}>Continue as Guest</button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ paddingTop: 60 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
