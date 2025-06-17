<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FilmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('films')->insert([
            [
                'title' => 'F1 (2025)',
                'description' => 'A thrilling action-packed movie about the world of Formula 1 racing.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Mission Impossible: Dead Reckoning Part One',
                'description' => 'A Thriller movie about the world of Mission Impossible.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
