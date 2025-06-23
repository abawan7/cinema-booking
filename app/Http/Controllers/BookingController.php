<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\BookingSeat;
use App\Models\Showtime;
use App\Models\ReservedSeat; 
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
        $bookings = Booking::where('user_id', auth()->id())->get();
        return response()->json($bookings);
    }

    /**
     * Store a newly created booking in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function storeWithSeats(Request $request)
    {
        $validated = $request->validate([
            'showtime_id' => 'required|exists:showtimes,id',
            'seats' => 'required|array|min:1',
            'seats.*' => 'string',
            // Add other fields as needed (e.g., num_tickets)
        ]);

        $user = auth()->user();

        // Start transaction
        \DB::beginTransaction();
        try {
            // Create booking
            $booking = Booking::create([
                'user_id' => $user->id,
                'showtime_id' => $validated['showtime_id'],
                'reference' => strtoupper(\Illuminate\Support\Str::random(8)),
                'num_tickets' => count($validated['seats']),
            ]);

            // Reserve seats
            foreach ($validated['seats'] as $seat) {
                ReservedSeat::create([
                    'showtime_id' => $validated['showtime_id'],
                    'seat_label' => $seat,
                ]);
                // Optionally, add to booking_seats table
                // BookingSeat::create(['booking_id' => $booking->id, 'seat_number' => $seat]);
            }

            \DB::commit();
            return response()->json(['booking' => $booking], 201);
        } catch (\Exception $e) {
            \DB::rollBack();
            return response()->json(['error' => 'Failed to book seats', 'details' => $e->getMessage()], 500);
        }
    }
    public function destroy($id)
{
    $booking = Booking::findOrFail($id);

    // Optionally, check if the authenticated user owns the booking
    if ($booking->user_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $booking->delete();

    return response()->json(['message' => 'Booking canceled successfully.']);
}
}
