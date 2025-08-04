<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\DailyQueue;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class CarBookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]);

        // Create drivers
        $drivers = User::factory()->count(5)->driver()->create();

        // Create regular users
        $users = User::factory()->count(10)->create();

        // Create sample bookings
        foreach ($users->take(5) as $user) {
            Booking::factory()->count(random_int(1, 3))->create([
                'user_id' => $user->id,
            ]);
        }

        // Create some approved bookings with drivers assigned
        foreach ($drivers->take(2) as $driver) {
            Booking::factory()->approved()->create([
                'user_id' => $users->random()->id,
                'driver_id' => $driver->id,
                'booking_date' => today(),
            ]);
        }

        // Create today's queue
        DailyQueue::create([
            'queue_date' => today(),
            'driver_order' => $drivers->pluck('id')->toArray(),
        ]);
    }
}