<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        $this->call([
            CinemaSeeder::class,
            TheatreSeeder::class,
            FilmSeeder::class,
            ShowtimeSeeder::class,
        ]);

        // Add specific user
        User::create([
            'name' => 'abdullah awan',
            'email' => 'mlkabawan336@gmail.com',
            'password' => Hash::make('12345678'),
        ]);
    }
}
