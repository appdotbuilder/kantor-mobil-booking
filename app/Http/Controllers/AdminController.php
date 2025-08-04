<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\DailyQueue;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display admin dashboard.
     */
    public function index()
    {
        $totalDrivers = User::drivers()->count();
        $availableDrivers = User::availableDrivers()->count();
        $onTripDrivers = User::drivers()->where('status', 'on_trip')->count();
        
        $pendingBookings = Booking::pending()->with(['user'])->get();
        $todayBookings = Booking::whereDate('booking_date', today())
            ->with(['user', 'driver'])
            ->get();

        $drivers = User::drivers()->get();
        $todayQueue = DailyQueue::getToday();

        return Inertia::render('admin/dashboard', [
            'stats' => [
                'total_drivers' => $totalDrivers,
                'available_drivers' => $availableDrivers,
                'on_trip_drivers' => $onTripDrivers,
            ],
            'pending_bookings' => $pendingBookings,
            'today_bookings' => $todayBookings,
            'drivers' => $drivers,
            'today_queue' => $todayQueue,
        ]);
    }

    /**
     * Manage users.
     */
    public function show()
    {
        $users = User::latest()->paginate(10);

        return Inertia::render('admin/users', [
            'users' => $users
        ]);
    }

    /**
     * Update user role or status.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'sometimes|in:user,driver,admin',
            'is_available' => 'sometimes|boolean',
            'status' => 'sometimes|in:ready,on_trip',
        ]);

        $user->update($validated);

        return back()->with('success', 'Data pengguna berhasil diperbarui.');
    }

    /**
     * Reset daily queue.
     */
    public function store(Request $request)
    {
        $todayQueue = DailyQueue::getTodayOrCreate();
        
        $todayQueue->update([
            'reset_approved' => true,
            'reset_approved_at' => now(),
        ]);

        // Create tomorrow's queue based on today's order
        $tomorrow = today()->addDay();
        DailyQueue::updateOrCreate(
            ['queue_date' => $tomorrow],
            ['driver_order' => $todayQueue->driver_order]
        );

        return back()->with('success', 'Antrean harian berhasil direset untuk hari berikutnya.');
    }
}