<?php

namespace App\Http\Controllers;

use App\Models\Cinema;
use Illuminate\Http\Request;

class CinemaController extends Controller
{
    /**
     * Get all cinemas.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cinemas = Cinema::all(); // Retrieve all cinemas from the database
        return response()->json($cinemas); // Return cinemas data as JSON
    }
}
