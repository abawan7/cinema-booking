<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CinemaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('cinemas')->insert([
            [
                'name' => 'Cue Cinema',
                'location' => 'Gulberg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Imax Cinema',
                'location' => 'Township',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
