<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DriverController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Main dashboard - role-based routing
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Booking routes for users and admins
    Route::resource('bookings', BookingController::class);
    
    // Driver specific routes
    Route::prefix('driver')->name('driver.')->group(function () {
        Route::get('dashboard', [DriverController::class, 'index'])->name('dashboard');
        Route::post('trips', [DriverController::class, 'store'])->name('trips.start');
        Route::patch('trips/{booking}', [DriverController::class, 'update'])->name('trips.complete');
    });
    
    // Admin specific routes
    Route::prefix('admin')->name('admin.')->middleware(AdminMiddleware::class)->group(function () {
        Route::get('dashboard', [AdminController::class, 'index'])->name('dashboard');
        Route::get('users', [AdminController::class, 'show'])->name('users');
        Route::patch('users/{user}', [AdminController::class, 'update'])->name('users.update');
        Route::post('queue-reset', [AdminController::class, 'store'])->name('queue.reset');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
