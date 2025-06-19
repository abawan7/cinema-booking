<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'showtime_id', 'reference', 'num_tickets'
    ];

    /**
     * Get the seats associated with the booking.
     */
    public function bookingSeats()
    {
        return $this->hasMany(BookingSeat::class);
    }

    /**
     * Get the showtime for the booking.
     */
    public function showtime()
    {
        return $this->belongsTo(Showtime::class);
    }
}
