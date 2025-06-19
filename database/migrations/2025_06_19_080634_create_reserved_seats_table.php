<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('reserved_seats', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('showtime_id');
            $table->string('seat_label'); // e.g., 'A1', 'B5'
            $table->timestamps();
    
            $table->foreign('showtime_id')->references('id')->on('showtimes')->onDelete('cascade');
            $table->unique(['showtime_id', 'seat_label']); // Prevent double booking
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reserved_seats');
    }
};
