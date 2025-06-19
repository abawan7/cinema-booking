<?php

namespace App\Http\Controllers;

use App\Models\Showtime;
use Illuminate\Http\Request;

class ShowtimeController extends Controller
{
    /**
     * Get all showtimes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $showtimes = Showtime::all();  // Get all showtimes
        return response()->json($showtimes);  // Return the showtimes as a JSON response
    }

    /**
     * Create a new showtime.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'theatre_id' => 'required|exists:theatres,id',
            'film_id' => 'required|exists:films,id',
            'start_time' => 'required|date',
        ]);

        // Create a new showtime with the validated data
        $showtime = Showtime::create([
            'theatre_id' => $validatedData['theatre_id'],
            'film_id' => $validatedData['film_id'],
            'start_time' => $validatedData['start_time'],
        ]);

        // Return the newly created showtime as JSON
        return response()->json($showtime, 201);
    }
}
