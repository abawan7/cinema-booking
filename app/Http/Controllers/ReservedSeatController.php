<?php

namespace App\Http\Controllers;

use App\Models\ReservedSeat;
use Illuminate\Http\Request;

class ReservedSeatController extends Controller
{

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $showtimeId = $request->query('showtime_id');
        $query = \App\Models\ReservedSeat::query();
        if ($showtimeId) {
            $query->where('showtime_id', $showtimeId);
        }
        return response()->json($query->get());
    }

    /**
     * Reserve a seat for a showtime.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'showtime_id' => 'required|exists:showtimes,id',
            'seat_label' => 'required|string',
        ]);

        // Check if seat is already reserved
        $exists = ReservedSeat::where('showtime_id', $validated['showtime_id'])
            ->where('seat_label', $validated['seat_label'])
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'Seat already reserved'], 409);
        }

        $reservedSeat = ReservedSeat::create($validated);

        return response()->json($reservedSeat, 201);
    }
}
