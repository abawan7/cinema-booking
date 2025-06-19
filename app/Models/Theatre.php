<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Make sure this is imported
use Illuminate\Database\Eloquent\Model;

class Theatre extends Model
{
    use HasFactory;  // This is how you use the trait in your model

    protected $fillable = [
        'cinema_id', 'name',
    ];

    /**
     * Get the cinema that owns the theatre.
     */
    public function cinema()
    {
        return $this->belongsTo(Cinema::class);
    }

    /**
     * Get the showtimes for the theatre.
     */
    public function showtimes()
    {
        return $this->hasMany(Showtime::class);
    }
}
