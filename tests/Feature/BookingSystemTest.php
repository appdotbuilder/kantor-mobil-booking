<?php

use App\Models\Booking;
use App\Models\User;

test('user can create booking', function () {
    $user = User::factory()->create(['role' => 'user']);

    $response = $this->actingAs($user)->post('/bookings', [
        'booking_date' => now()->addDay()->format('Y-m-d'),
        'destination' => 'Jakarta',
        'purpose' => 'Meeting with client',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('bookings', [
        'user_id' => $user->id,
        'destination' => 'Jakarta',
        'status' => 'pending',
    ]);
});

test('admin can approve booking', function () {
    $admin = User::factory()->admin()->create();
    $driver = User::factory()->driver()->create();
    $booking = Booking::factory()->pending()->create();

    $response = $this->actingAs($admin)->patch("/bookings/{$booking->id}", [
        'status' => 'approved',
    ]);

    $response->assertRedirect();
    $booking->refresh();
    expect($booking->status)->toBe('approved');
    expect($booking->driver_id)->not->toBeNull();
});

test('driver can start trip', function () {
    $driver = User::factory()->driver()->create();
    $booking = Booking::factory()->approved()->create(['driver_id' => $driver->id]);

    $response = $this->actingAs($driver)->post('/driver/trips', [
        'start_km' => 10000,
    ]);

    $response->assertRedirect();
    $booking->refresh();
    expect($booking->status)->toBe('in_progress');
    expect($booking->start_km)->toBe(10000);
});

test('driver can complete trip', function () {
    $driver = User::factory()->driver()->create(['status' => 'on_trip']);
    $booking = Booking::factory()->create([
        'driver_id' => $driver->id,
        'status' => 'in_progress',
        'start_km' => 10000,
    ]);

    $response = $this->actingAs($driver)->patch("/driver/trips/{$booking->id}", [
        'end_km' => 10150,
    ]);

    $response->assertRedirect();
    $booking->refresh();
    expect($booking->status)->toBe('completed');
    expect($booking->end_km)->toBe(10150);
    
    $driver->refresh();
    expect($driver->status)->toBe('ready');
});

test('user dashboard shows available drivers', function () {
    $user = User::factory()->create(['role' => 'user']);
    User::factory()->count(3)->driver()->create();

    $response = $this->actingAs($user)->get('/dashboard');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('user/dashboard')
             ->has('available_drivers')
    );
});

test('admin dashboard shows stats', function () {
    $admin = User::factory()->admin()->create();
    User::factory()->count(5)->driver()->create();
    Booking::factory()->count(3)->pending()->create();

    $response = $this->actingAs($admin)->get('/dashboard');

    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('admin/dashboard')
             ->has('stats')
             ->has('pending_bookings')
    );
});