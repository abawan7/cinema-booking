<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ShowtimeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $theatres = DB::table('theatres')->pluck('id');
        $films = DB::table('films')->pluck('id');
        $showtimes = [];
        $start = Carbon::now()->addDay()->setTime(18, 0, 0); // Tomorrow, 6pm
        foreach ($theatres as $theatre_id) {
            foreach ($films as $film_id) {
                for ($i = 0; $i < 2; $i++) { 
                    $showtimes[] = [
                        'theatre_id' => $theatre_id,
                        'film_id' => $film_id,
                        'start_time' => $start->copy()->addHours($i * 3),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
            }
        }
        DB::table('showtimes')->insert($showtimes);
    }
}
