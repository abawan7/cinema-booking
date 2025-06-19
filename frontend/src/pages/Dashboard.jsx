import React from "react";
import { useNavigate } from "react-router-dom";
import { Film } from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();

    // Handle navigating to bookings page
    const goToBookings = () => {
        navigate("/bookings");
    };

    return (
        <div className="w-full h-full flex items-center justify-center bg-[#181926]">
            <div className="flex w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden bg-[#23243a]">
                {/* Left: Cinema Image */}
                <div className="hidden md:block w-1/2 bg-black">
                    <img
                        src="https://img.freepik.com/free-photo/rows-red-seats-theater_53876-64710.jpg?semt=ais_items_boosted&w=740"
                        alt="Cinema Seats"
                        className="object-cover w-full h-full rounded-l-2xl"
                    />
                </div>
                {/* Right: Dashboard Content */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-[#23243a]">
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-yellow-400 rounded-full flex items-center justify-center shadow-lg mb-4">
                            <Film className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white mb-2 text-center">Welcome to Your Dashboard</h1>
                        <p className="text-gray-400 text-lg mb-6 text-center">
                            Here you can view your details, manage bookings, and more.
                        </p>
                    </div>
                    <button
                        onClick={goToBookings}
                        className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-red-600 hover:to-pink-600 transition mb-4"
                    >
                        Go to Bookings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
