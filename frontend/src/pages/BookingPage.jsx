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
                {/* Right: Booking Form and Details */}
                <div className="w-full md:w-1/2 flex flex-col justify-center p-12 bg-[#23243a] overflow-y-auto max-h-[90vh]">
                    <h1 className="text-3xl font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
                        <Ticket className="w-8 h-8 text-red-400" /> Book Your Tickets
                    </h1>
                    {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                    {/* Cinema Selection Dialog */}
                    {showCinemaDialog ? (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                <MapPin className="text-red-400" /> Choose Your Cinema
                            </h2>
                            <div className="grid gap-4">
                                {cinemas.map((cinema) => (
                                    <div key={cinema.id} onClick={() => handleCinemaSelect(cinema.id)} className="p-4 bg-[#23243a] border border-gray-700 rounded-lg cursor-pointer hover:border-red-400 transition flex items-center justify-between">
                                        <span className="text-white font-medium">{cinema.name}</span>
                                        <ChevronRight className="text-gray-400 group-hover:text-red-400 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6">
                            {/* Film Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                                    <Film className="w-4 h-4" /> Select Film
                                </label>
                                <select
                                    value={selectedFilm || ""}
                                    onChange={(e) => handleFilmSelect(e.target.value)}
                                    required
                                    className="w-full p-3 bg-[#23243a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-400 transition"
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
                                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                                    <Clock className="w-4 h-4" /> Select Showtime
                                </label>
                                <select
                                    value={selectedShowtime || ""}
                                    onChange={(e) => setSelectedShowtime(e.target.value)}
                                    required
                                    className="w-full p-3 bg-[#23243a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-400 transition"
                                >
                                    <option value="">Choose a Showtime</option>
                                    {showtimes.map((showtime) => (
                                        <option value={showtime.id} key={showtime.id}>
                                            {showtime.start_time || showtime.time || 'Showtime'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Number of Tickets */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1 flex items-center gap-2">
                                    <Users className="w-4 h-4" /> Number of Tickets
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={30}
                                    value={numTickets}
                                    onChange={(e) => setNumTickets(Number(e.target.value))}
                                    className="w-full p-3 bg-[#23243a] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-red-400 transition"
                                />
                            </div>
                            {/* Book Now Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    if (!selectedShowtime || numTickets < 1 || numTickets > 30) {
                                        setError("Please select a valid showtime and number of tickets.");
                                        return;
                                    }
                                    navigate('/select-seats', {
                                        state: {
                                            showtimeId: selectedShowtime,
                                            numTickets,
                                        }
                                    });
                                }}
                                className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-red-600 hover:to-pink-600 transition"
                            >
                                Book Now
                            </button>
                        </form>
                    )}
                    {/* Bookings List */}
                    <div className="mt-10">
                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                            <Calendar className="text-red-400" /> Your Bookings
                        </h2>
                        <div className="space-y-4 max-h-40 overflow-y-auto">
                            {bookings.length === 0 ? (
                                <div className="text-gray-400">No bookings yet.</div>
                            ) : (
                                bookings.map((booking) => (
                                    <div key={booking.id} className="p-4 bg-[#23243a] border border-gray-700 rounded-lg flex items-center justify-between">
                                        <div>
                                            <div className="text-white font-medium">{booking.film_title || 'Film'}</div>
                                            <div className="text-gray-400 text-sm">Showtime: {booking.showtime_time || 'Time'}</div>
                                            <div className="text-gray-400 text-sm">Tickets: {booking.num_tickets}</div>
                                        </div>
                                        <button
                                            onClick={() => handleCancelBooking(booking.id)}
                                            className="text-red-400 hover:text-red-600 transition"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
