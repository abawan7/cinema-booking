<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingSeat extends Model
{
    use HasFactory;

    protected $fillable = ['booking_id', 'seat_number'];

    /**
     * Get the booking associated with the seat.
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
