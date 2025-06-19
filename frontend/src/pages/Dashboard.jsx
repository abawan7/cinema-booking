import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();

    // Handle navigating to bookings page
    const goToBookings = () => {
        navigate("/bookings");
    };

    return (
        <div className="container">
            <h1>Welcome to the Dashboard</h1>

            <p>Here you can view your details, manage bookings, and more.</p>

            <button onClick={goToBookings} className="btn btn-primary">
                Go to Bookings
            </button>
        </div>
    );
};

export default Dashboard;
