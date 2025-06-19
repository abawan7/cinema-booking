<?php

namespace App\Http\Controllers;

use App\Models\Film;  // Import Film model
use Illuminate\Http\Request;

class FilmController extends Controller
{
    /**
     * Get all films.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $films = Film::all();  // Retrieve all films from the database
        return response()->json($films);  // Return the films as JSON
    }
}
