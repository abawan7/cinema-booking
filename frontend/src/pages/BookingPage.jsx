import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin"); // If no token, redirect to login page
            return;
        }

        fetchData(token);
    }, [navigate]);

    const fetchData = async (token) => {
        try {
            const cinemasRes = await axios.get("http://localhost:8000/api/cinemas", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCinemas(cinemasRes.data);

            const filmsRes = await axios.get("http://localhost:8000/api/films", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFilms(filmsRes.data);

            const bookingsRes = await axios.get("http://localhost:8000/api/bookings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBookings(bookingsRes.data);
        } catch (err) {
            setError("Failed to fetch data.");
            console.error(err);
        }
    };

    const handleCinemaChange = async (e) => {
        const cinemaId = e.target.value;
        setSelectedCinema(cinemaId);
        try {
            const showtimesRes = await axios.get(
                `http://localhost:8000/api/showtimes?cinema_id=${cinemaId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
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
            const response = await axios.post(
                "http://localhost:8000/api/bookings",
                {
                    showtime_id: selectedShowtime,
                    num_tickets: numTickets,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
            await axios.delete(`http://localhost:8000/api/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setBookings(bookings.filter((booking) => booking.id !== bookingId));
            alert("Booking canceled successfully!");
        } catch (err) {
            setError("Failed to cancel booking.");
            console.error(err);
        }
    };

    return (
        <div className="container">
            <h1>Booking Page</h1>
            {error && <div style={{ color: "red" }}>{error}</div>}

            {/* Booking Form */}
            <form onSubmit={handleBooking}>
                <div>
                    <label>Cinema:</label>
                    <select
                        value={selectedCinema}
                        onChange={handleCinemaChange}
                        required
                    >
                        <option value="">Select Cinema</option>
                        {cinemas.map((cinema) => (
                            <option value={cinema.id} key={cinema.id}>
                                {cinema.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Film:</label>
                    <select
                        value={selectedFilm}
                        onChange={(e) => setSelectedFilm(e.target.value)}
                        required
                    >
                        <option value="">Select Film</option>
                        {films.map((film) => (
                            <option value={film.id} key={film.id}>
                                {film.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Showtime:</label>
                    <select
                        value={selectedShowtime}
                        onChange={(e) => setSelectedShowtime(e.target.value)}
                        required
                    >
                        <option value="">Select Showtime</option>
                        {showtimes
                            .filter((showtime) => showtime.film_id === selectedFilm)
                            .map((showtime) => (
                                <option value={showtime.id} key={showtime.id}>
                                    {showtime.start_time}
                                </option>
                            ))}
                    </select>
                </div>

                <div>
                    <label>Number of Tickets:</label>
                    <input
                        type="number"
                        value={numTickets}
                        onChange={(e) => setNumTickets(e.target.value)}
                        min="1"
                        max="30"
                        required
                    />
                </div>

                <button type="submit">Book Tickets</button>
            </form>

            <hr />

            {/* User Bookings List */}
            <h2>Your Bookings</h2>
            {bookings.length === 0 ? (
                <p>You have no bookings.</p>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>Reference</th>
                        <th>Film</th>
                        <th>Showtime</th>
                        <th>Seats</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <td>{booking.reference}</td>
                            <td>{booking.showtime.film.title}</td>
                            <td>{booking.showtime.start_time}</td>
                            <td>{booking.num_tickets} seats</td>
                            <td>
                                <button onClick={() => handleCancelBooking(booking.id)}>
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default BookingPage;
