<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'showtime_id', 'reference', 'num_tickets',
    ];

    /**
     * Get the showtime that owns the booking.
     */
    public function showtime()
    {
        return $this->belongsTo(Showtime::class);
    }

    /**
     * Get the user that owns the booking.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
