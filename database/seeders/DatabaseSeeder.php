<?php

// database/seeders/BookingSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Cinema;
use App\Models\Film;
use App\Models\Theatre;
use App\Models\Showtime;
use App\Models\Booking;
use Carbon\Carbon;

class BookingSeeder extends Seeder
{
    public function run()
    {
        // 1. Create dummy users (using factory to generate random users)
        $users = User::factory(10)->create(); // You can adjust the number of users

        // 2. Create real cinemas in Lahore
        $cinema1 = Cinema::create([
            'name' => 'Cinepax Cinema',
            'location' => 'Faisal Town, Lahore',
        ]);

        $cinema2 = Cinema::create([
            'name' => 'Super Cinema',
            'location' => 'Liberty Market, Lahore',
        ]);

        $cinema3 = Cinema::create([
            'name' => 'The Arena',
            'location' => 'Mauve Area, Lahore',
        ]);

        $cinema4 = Cinema::create([
            'name' => 'Lahore Mall Cinema',
            'location' => 'Johar Town, Lahore',
        ]);

        // 3. Create theatres for each cinema
        $theatre1 = Theatre::create([
            'cinema_id' => $cinema1->id,
            'name' => 'Theatre 1',
        ]);

        $theatre2 = Theatre::create([
            'cinema_id' => $cinema2->id,
            'name' => 'Theatre 2',
        ]);

        $theatre3 = Theatre::create([
            'cinema_id' => $cinema3->id,
            'name' => 'Theatre 3',
        ]);

        $theatre4 = Theatre::create([
            'cinema_id' => $cinema4->id,
            'name' => 'Theatre 4',
        ]);

        // 4. Create real films (replace with actual popular films if needed)
        $film1 = Film::create([
            'title' => 'Spider-Man: No Way Home',
            'description' => 'A thrilling superhero film with multiverse twists.',
        ]);

        $film2 = Film::create([
            'title' => 'The Batman',
            'description' => 'A dark and gritty reimagining of the iconic superhero.',
        ]);

        $film3 = Film::create([
            'title' => 'Dune',
            'description' => 'A visually stunning adaptation of Frank Herbert\'s sci-fi novel.',
        ]);

        $film4 = Film::create([
            'title' => 'Fast & Furious 9',
            'description' => 'Action-packed and high-octane, the latest in the Fast & Furious series.',
        ]);

        // 5. Create showtimes for each film and theatre
        $showtime1 = Showtime::create([
            'theatre_id' => $theatre1->id,
            'film_id' => $film1->id,
            'start_time' => Carbon::now()->addDays(1)->setTime(15, 0), // 3:00 PM
        ]);

        $showtime2 = Showtime::create([
            'theatre_id' => $theatre2->id,
            'film_id' => $film2->id,
            'start_time' => Carbon::now()->addDays(2)->setTime(18, 0), // 6:00 PM
        ]);

        $showtime3 = Showtime::create([
            'theatre_id' => $theatre3->id,
            'film_id' => $film3->id,
            'start_time' => Carbon::now()->addDays(3)->setTime(20, 0), // 8:00 PM
        ]);

        $showtime4 = Showtime::create([
            'theatre_id' => $theatre4->id,
            'film_id' => $film4->id,
            'start_time' => Carbon::now()->addDays(4)->setTime(21, 0), // 9:00 PM
        ]);

        // 6. Create dummy bookings for users (Random bookings)
        foreach ($users as $user) {
            // Randomly assign showtime and number of tickets (up to 5 tickets per booking)
            $showtime = [ $showtime1, $showtime2, $showtime3, $showtime4 ][array_rand([ $showtime1, $showtime2, $showtime3, $showtime4 ])];
            $numTickets = rand(1, 5);
            $reference = strtoupper(str_random(8));

            // Create the booking
            $booking = Booking::create([
                'user_id' => $user->id,
                'showtime_id' => $showtime->id,
                'reference' => $reference,
                'num_tickets' => $numTickets,
            ]);

            // Assign seats to the booking (1 to num_tickets)
            for ($i = 1; $i <= $numTickets; $i++) {
                DB::table('booking_seats')->insert([
                    'booking_id' => $booking->id,
                    'seat_number' => $i,
                ]);
            }
        }

        echo "Bookings data seeded successfully!";
    }
}
