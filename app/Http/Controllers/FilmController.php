<?php

namespace App\Http\Controllers;

use App\Models\Cinema;
use App\Models\Film;
use App\Models\Showtime;
use App\Models\Theatre;
use Illuminate\Http\Request;

class FilmController extends Controller
{
    /**
     * Get all films.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request) {
        $cinemaId = $request->query('cinema_id');
        if ($cinemaId) {
            $theatreIds = Theatre::where('cinema_id', $cinemaId)->pluck('id');
            $filmIds = Showtime::whereIn('theatre_id', $theatreIds)->pluck('film_id')->unique();
            $films = Film::whereIn('id', $filmIds)->get();
        } else {
            $films = Film::all();
        }
        return response()->json($films);
    }
}
