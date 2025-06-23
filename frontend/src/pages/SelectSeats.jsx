import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const rows = 'ABCDEFGHIJ'.split('');
const cols = Array.from({ length: 12 }, (_, i) => i + 1);

export default function SelectSeats() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showtimeId, numTickets } = location.state || {};
  const maxSelectable = numTickets || 1;
  const [selected, setSelected] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);

  // Fetch reserved seats for the selected showtime
  useEffect(() => {
    if (!showtimeId) return;
    const fetchReservedSeats = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/reserved-seats?showtime_id=${showtimeId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setReservedSeats(res.data.map(seat => seat.seat_label));
      } catch (err) {
        setReservedSeats([]); // fallback to empty if error
      }
    };
    fetchReservedSeats();
  }, [showtimeId]);

  const handleSeatClick = (seat) => {
    if (reservedSeats.includes(seat)) return;
    if (selected.includes(seat)) {
      setSelected(selected.filter((s) => s !== seat));
    } else if (selected.length < maxSelectable) {
      setSelected([...selected, seat]);
    }
  };

  const handleConfirm = async () => {
    if (selected.length === maxSelectable) {
      try {
        await axios.post('http://localhost:8000/api/bookings-with-seats', {
          showtime_id: showtimeId,
          seats: selected,
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        alert('Booking and seats reserved successfully!');
        navigate('/dashboard');
      } catch (err) {
        alert('Failed to reserve seats.');
      }
    } else {
      alert(`Please select exactly ${maxSelectable} seats.`);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#181926] p-8">
      <h1 className="text-3xl font-bold text-white mb-2">Movie Seat Selection</h1>
      <p className="text-gray-400 mb-6">Select exactly <span className="text-red-400 font-bold">{maxSelectable}</span> seat(s) for your booking.</p>
      <div className="bg-[#23243a] rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        {/* Seat Legend */}
        <div className="flex gap-6 mb-6">
          <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-green-500 border-2 border-green-700 inline-block"></span> <span className="text-gray-200 text-sm">Selected</span></div>
          <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-red-500 border-2 border-red-700 inline-block"></span> <span className="text-gray-200 text-sm">Reserved</span></div>
          <div className="flex items-center gap-2"><span className="w-6 h-6 rounded bg-gray-300 border-2 border-gray-500 inline-block"></span> <span className="text-gray-200 text-sm">Empty</span></div>
        </div>
        {/* Seat Grid */}
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-2">
            <thead>
              <tr>
                <th></th>
                {cols.map((col) => (
                  <th key={col} className="text-gray-400 text-sm">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row}>
                  <td className="text-gray-400 text-sm pr-2 font-bold">{row}</td>
                  {cols.map((col) => {
                    const seat = `${row}${col}`;
                    const isReserved = reservedSeats.includes(seat);
                    const isSelected = selected.includes(seat);
                    return (
                      <td key={seat}>
                        <button
                          type="button"
                          className={`w-8 h-8 rounded flex items-center justify-center border-2 text-xs font-bold
                            ${isReserved ? 'bg-red-500 border-red-700 text-white cursor-not-allowed' :
                              isSelected ? 'bg-green-500 border-green-700 text-white' :
                              'bg-gray-300 border-gray-500 text-gray-800 hover:bg-yellow-300 hover:border-yellow-500'}
                          `}
                          disabled={isReserved}
                          onClick={() => handleSeatClick(seat)}
                        >
                          {col}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={handleConfirm}
          className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold text-lg shadow-md hover:from-red-600 hover:to-pink-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
} 