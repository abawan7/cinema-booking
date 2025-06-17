<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TheatreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get cinema IDs
        $cinemas = DB::table('cinemas')->pluck('id');
        $theatres = [];
        foreach ($cinemas as $cinema_id) {
            $theatres[] = [
                'cinema_id' => $cinema_id,
                'name' => 'Platium Screen 1',
                'created_at' => now(),
                'updated_at' => now(),
            ];
            $theatres[] = [
                'cinema_id' => $cinema_id,
                'name' => 'Platium Screen 2',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        DB::table('theatres')->insert($theatres);
    }
}
