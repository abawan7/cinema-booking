<?php

use App\Http\Controllers\CinemaController; // Add this import for CinemaController
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:api')->get('/cinemas', [CinemaController::class, 'index']);
Route::middleware('auth:api')->get('/films', [FilmController::class, 'index']);
