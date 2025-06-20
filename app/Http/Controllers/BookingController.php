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
     * Display a listing of the bookings.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Fetch all bookings from the database
        $bookings = Booking::all();
        return response()->json($bookings);  // Return bookings as JSON
    }

    /**
     * Store a newly created booking in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate incoming data
        $validatedData = $request->validate([
            'showtime_id' => 'required|exists:showtimes,id', // Validate showtime_id
            'num_tickets' => 'required|integer|min:1|max:30', // Validate num_tickets
        ]);

        // Create the booking with the validated data
        $booking = Booking::create([
            'user_id' => auth()->user()->id,  // Assuming the user is authenticated
            'showtime_id' => $validatedData['showtime_id'],
            'reference' => strtoupper(\Illuminate\Support\Str::random(8)), // Generate random reference
            'num_tickets' => $validatedData['num_tickets'],
        ]);

        // Return the newly created booking as JSON
        return response()->json($booking, 201);
    }
}
