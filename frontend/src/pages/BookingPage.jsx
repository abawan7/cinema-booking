import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios correctly
import { Film, MapPin, Clock, Users, Ticket, X, Calendar, ChevronRight } from "lucide-react";

const BookingPage = () => {
    const [cinemas, setCinemas] = useState([]);
    const [films, setFilms] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [selectedCinema, setSelectedCinema] = useState(null);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const [numTickets, setNumTickets] = useState(1);
    const [error, setError] = useState("");
    const [showCinemaDialog, setShowCinemaDialog] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
            return;
        }
        fetchData(token);
    }, [navigate]);

    const fetchData = async (token) => {
        try {
            // Fetch cinemas
            const cinemasRes = await axios.get("http://localhost:8000/api/cinemas", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCinemas(cinemasRes.data);

            // Fetch bookings
            const bookingsRes = await axios.get("http://localhost:8000/api/bookings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(bookingsRes.data);
        } catch (err) {
            setError("Failed to fetch data.");
            console.error(err);
        }
    };

    const handleCinemaSelect = async (cinemaId) => {
        setSelectedCinema(cinemaId);
        setShowCinemaDialog(false);

        try {
            // Fetch films for selected cinema
            const filmsRes = await axios.get(`http://localhost:8000/api/films?cinema_id=${cinemaId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setFilms(filmsRes.data);
        } catch (err) {
            console.error("Error fetching films:", err);
        }
    };

    const handleFilmSelect = async (filmId) => {
        setSelectedFilm(filmId);

        try {
            // Fetch showtimes for selected film
            const showtimesRes = await axios.get(`http://localhost:8000/api/showtimes?film_id=${filmId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            setShowtimes(showtimesRes.data);
        } catch (err) {
            console.error("Error fetching showtimes:", err);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!selectedShowtime || numTickets < 1 || numTickets > 30) {
            setError("Please select a valid showtime and number of tickets.");
            return;
        }

        try {
            // Create booking
            const response = await axios.post(
                "http://localhost:8000/api/bookings",
                {
                    showtime_id: selectedShowtime,
                    num_tickets: numTickets,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setBookings([...bookings, response.data]);
            setError("");
            alert("Booking created successfully!");
        } catch (err) {
            setError("Booking failed. Please try again.");
            console.error(err);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        const token = localStorage.getItem("token");
        try {
            // Cancel booking
            await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(bookings.filter((booking) => booking.id !== bookingId));
            alert("Booking canceled successfully!");
        } catch (err) {
            setError("Failed to cancel booking.");
            console.error(err);
        }
    };

    const selectedCinemaName = cinemas.find(c => c.id == selectedCinema)?.name;
    const selectedFilmTitle = films.find(f => f.id == selectedFilm)?.title;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }}></div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">CineBook</h1>
                    <p className="text-xl text-gray-300">Experience Movies Like Never Before</p>
                </div>

                {/* Error Message */}
                {error && <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 backdrop-blur-sm">{error}</div>}

                {/* Cinema Selection Dialog */}
                {showCinemaDialog && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-purple-500/20 shadow-2xl">
                            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                                <MapPin className="text-purple-400" />
                                Choose Your Cinema
                            </h2>
                            <div className="grid gap-4">
                                {cinemas.map((cinema) => (
                                    <div key={cinema.id} onClick={() => handleCinemaSelect(cinema.id)} className="p-6 bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:from-purple-600/30 hover:to-pink-600/30 border border-slate-600/50 hover:border-purple-500/50 group">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">{cinema.name}</h3>
                                                <p className="text-gray-400 mt-1">Premium Experience</p>
                                            </div>
                                            <ChevronRight className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Booking Interface */}
                {!showCinemaDialog && (
                    <div className="max-w-6xl mx-auto">
                        {/* Progress Bar */}
                        <div className="mb-8 bg-slate-800/50 rounded-full p-1 backdrop-blur-sm">
                            <div className="flex items-center justify-between text-sm text-gray-400 px-4 py-2">
                                <span className="text-purple-400 font-medium">Cinema: {selectedCinemaName}</span>
                                {selectedFilmTitle && <span className="text-purple-400 font-medium">Film: {selectedFilmTitle}</span>}
                                {selectedShowtime && <span className="text-purple-400 font-medium">Ready to Book</span>}
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Booking Form */}
                            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Ticket className="text-purple-400" />
                                    Book Your Tickets
                                </h2>

                                <div className="space-y-6">
                                    {/* Film Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                            <Film className="w-4 h-4" />
                                            Select Film
                                        </label>
                                        <select
                                            value={selectedFilm || ""}
                                            onChange={(e) => handleFilmSelect(e.target.value)}
                                            required
                                            className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        >
                                            <option value="">Choose a Film</option>
                                            {films.map((film) => (
                                                <option value={film.id} key={film.id}>
                                                    {film.title}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Showtime Selection */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Select Showtime
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {showtimes
                                                .filter((showtime) => showtime.film_id == selectedFilm)
                                                .map((showtime) => (
                                                    <button
                                                        key={showtime.id}
                                                        type="button"
                                                        onClick={() => setSelectedShowtime(showtime.id)}
                                                        className={`p-4 rounded-xl border transition-all ${
                                                            selectedShowtime == showtime.id
                                                                ? 'bg-purple-600 border-purple-500 text-white'
                                                                : 'bg-slate-700/50 border-slate-600 text-gray-300 hover:border-purple-500/50'
                                                        }`}
                                                    >
                                                        <div className="font-semibold">{showtime.start_time}</div>
                                                    </button>
                                                ))}
                                        </div>
                                    </div>

                                    {/* Ticket Quantity */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Number of Tickets
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setNumTickets(Math.max(1, numTickets - 1))}
                                                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                value={numTickets}
                                                onChange={(e) => setNumTickets(parseInt(e.target.value) || 1)}
                                                min="1"
                                                max="30"
                                                className="w-20 p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-center focus:ring-2 focus:ring-purple-500"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setNumTickets(Math.min(30, numTickets + 1))}
                                                className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        onClick={handleBooking}
                                        disabled={!selectedShowtime}
                                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 disabled:hover:scale-100"
                                    >
                                        Book Tickets
                                    </button>
                                </div>
                            </div>

                            {/* Your Bookings */}
                            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Calendar className="text-purple-400" />
                                    Your Bookings
                                </h2>

                                {bookings.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Ticket className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <p className="text-gray-400 text-lg">No bookings yet</p>
                                        <p className="text-gray-500 text-sm mt-2">Your movie tickets will appear here</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {bookings.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl p-6 border border-slate-600/50"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                                                            <Ticket className="w-6 h-6 text-white" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-white">
                                                                {booking.showtime.film.title}
                                                            </h3>
                                                            <p className="text-gray-400 text-sm">
                                                                Ref: {booking.reference}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleCancelBooking(booking.id)}
                                                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 text-sm">
                                                    <div className="flex items-center gap-2 text-gray-300">
                                                        <Clock className="w-4 h-4" />
                                                        {booking.showtime.start_time}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-gray-300">
                                                        <Users className="w-4 h-4" />
                                                        {booking.num_tickets} seats
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
