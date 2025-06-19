<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\Showtime;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BookingController extends Controller
{
    /**
     * Display a list of bookings for the authenticated user.
     */
    public function index()
    {
        $user = auth()->user();
        $bookings = Booking::where('user_id', $user->id)->get();

        return view('bookings.index', compact('bookings'));
    }

    /**
     * Store a new booking.
     */
    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'showtime_id' => 'required|exists:showtimes,id',
            'num_tickets' => 'required|integer|min:1|max:30',
        ]);

        // Get the logged-in user
        $user = auth()->user();

        // Generate a unique reference code
        $reference = strtoupper(Str::random(8));

        // Create the booking
        $booking = Booking::create([
            'user_id' => $user->id,
            'showtime_id' => $request->showtime_id,
            'reference' => $reference,
            'num_tickets' => $request->num_tickets,
        ]);

        // Assign seats to the booking (1 to num_tickets)
        for ($i = 1; $i <= $request->num_tickets; $i++) {
            BookingSeat::create([
                'booking_id' => $booking->id,
                'seat_number' => $i, // Seat number starts from 1
            ]);
        }

        // Redirect back to bookings page with success message
        return redirect()->route('bookings.index')->with('success', 'Booking created successfully');
    }

    /**
     * Cancel an existing booking.
     */
    public function cancel($id)
    {
        $user = auth()->user();
        $booking = Booking::where('user_id', $user->id)->findOrFail($id);

        // Ensure booking can be canceled at least 1 hour before showtime
        $showtime = $booking->showtime;
        $currentTime = now();

        if ($currentTime->diffInMinutes($showtime->start_time) <= 60) {
            return redirect()->route('bookings.index')->with('error', 'You can only cancel the booking 1 hour before showtime.');
        }

        // Delete the booking and associated seats
        $booking->bookingSeats()->delete();
        $booking->delete();

        return redirect()->route('bookings.index')->with('success', 'Booking canceled successfully');
    }
}
