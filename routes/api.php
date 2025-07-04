<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\CinemaController; // Add this import for CinemaController
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FilmController;
use App\Http\Controllers\ShowtimeController;
use App\Http\Controllers\ReservedSeatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/cinemas', [CinemaController::class, 'index']);
Route::get('/films', [FilmController::class, 'index']);
Route::get('/showtimes', [ShowtimeController::class, 'index']);
Route::get('/reserved-seats', [ReservedSeatController::class, 'index']);
Route::middleware('auth:api')->get('/bookings', [BookingController::class, 'index']);
Route::middleware('auth:api')->post('/bookings-with-seats', [BookingController::class, 'storeWithSeats']);
Route::middleware('auth:api')->post('/showtimes', [ShowtimeController::class, 'store']);
Route::middleware('auth:api')->post('/reserved-seats', [ReservedSeatController::class, 'store']);
Route::middleware('auth:api')->delete('/bookings/{id}', [BookingController::class, 'destroy']);
