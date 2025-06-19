<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory
use Illuminate\Database\Eloquent\Model;

class Showtime extends Model
{
    use HasFactory; // Use HasFactory trait

    protected $fillable = [
        'theatre_id', 'film_id', 'start_time',
    ];

    /**
     * Get the theatre that the showtime belongs to.
     */
    public function theatre()
    {
        return $this->belongsTo(Theatre::class);
    }

    /**
     * Get the film that the showtime belongs to.
     */
    public function film()
    {
        return $this->belongsTo(Film::class);
    }
}
