<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display role-based dashboard.
     */
    public function index()
    {
        $user = auth()->user();

        switch ($user->role) {
            case 'admin':
                return app(AdminController::class)->index();
            
            case 'driver':
                return app(DriverController::class)->index();
            
            default:
                // User dashboard
                $availableDrivers = User::availableDrivers()->count();
                $userBookings = $user->bookings()
                    ->with('driver')
                    ->latest()
                    ->limit(5)
                    ->get();

                return Inertia::render('user/dashboard', [
                    'available_drivers' => $availableDrivers,
                    'recent_bookings' => $userBookings,
                ]);
        }
    }
}