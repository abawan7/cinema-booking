<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    use HasFactory; // Use HasFactory trait

    protected $fillable = [
        'title', 'description',
    ];

    /**
     * Get the showtimes for the film.
     */
    public function showtimes()
    {
        return $this->hasMany(Showtime::class);
    }
}
