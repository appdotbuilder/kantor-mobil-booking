<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StartTripRequest;
use App\Http\Requests\CompleteTripRequest;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DriverController extends Controller
{
    /**
     * Display driver dashboard.
     */
    public function index()
    {
        $driver = auth()->user();
        
        $currentBooking = $driver->driverBookings()
            ->whereIn('status', ['approved', 'in_progress'])
            ->with('user')
            ->first();

        return Inertia::render('driver/dashboard', [
            'driver' => $driver,
            'currentBooking' => $currentBooking,
        ]);
    }

    /**
     * Start a trip.
     */
    public function store(StartTripRequest $request)
    {
        $driver = auth()->user();
        
        $booking = $driver->driverBookings()
            ->where('status', 'approved')
            ->first();

        if (!$booking) {
            return back()->with('error', 'Tidak ada pemesanan yang tersedia untuk dimulai.');
        }

        $booking->update([
            'status' => 'in_progress',
            'start_km' => $request->start_km,
            'started_at' => now(),
        ]);

        $driver->update([
            'status' => 'on_trip',
        ]);

        return redirect()->route('driver.dashboard')
            ->with('success', 'Perjalanan berhasil dimulai.');
    }

    /**
     * Complete a trip.
     */
    public function update(CompleteTripRequest $request, Booking $booking)
    {
        $driver = auth()->user();

        // Verify this booking belongs to the driver
        if ($booking->driver_id !== $driver->id) {
            return back()->with('error', 'Akses tidak diizinkan.');
        }

        $booking->update([
            'status' => 'completed',
            'end_km' => $request->end_km,
            'completed_at' => now(),
        ]);

        $driver->update([
            'status' => 'ready',
        ]);

        return redirect()->route('driver.dashboard')
            ->with('success', 'Perjalanan berhasil diselesaikan.');
    }
}