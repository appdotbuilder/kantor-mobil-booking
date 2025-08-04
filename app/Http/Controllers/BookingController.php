<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBookingRequest;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdmin()) {
            $bookings = Booking::with(['user', 'driver'])
                ->latest()
                ->paginate(10);
        } else {
            $bookings = $user->bookings()
                ->with('driver')
                ->latest()
                ->paginate(10);
        }

        return Inertia::render('bookings/index', [
            'bookings' => $bookings
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('bookings/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBookingRequest $request)
    {
        $booking = Booking::create([
            'user_id' => auth()->id(),
            'booking_date' => $request->booking_date,
            'destination' => $request->destination,
            'purpose' => $request->purpose,
            'status' => 'pending',
        ]);

        return redirect()->route('bookings.index')
            ->with('success', 'Pemesanan berhasil dibuat dan menunggu persetujuan admin.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        $booking->load(['user', 'driver']);

        return Inertia::render('bookings/show', [
            'booking' => $booking
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
        ]);

        if ($validated['status'] === 'approved') {
            // Assign next available driver
            $availableDriver = User::availableDrivers()->first();
            
            if (!$availableDriver) {
                return back()->with('error', 'Tidak ada driver yang tersedia saat ini.');
            }

            $booking->update([
                'status' => 'approved',
                'driver_id' => $availableDriver->id,
                'approved_at' => now(),
            ]);

            return back()->with('success', 'Pemesanan berhasil disetujui dan driver telah ditugaskan.');
        } else {
            $booking->update([
                'status' => 'rejected',
            ]);

            return back()->with('success', 'Pemesanan berhasil ditolak.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        $booking->delete();

        return redirect()->route('bookings.index')
            ->with('success', 'Pemesanan berhasil dihapus.');
    }
}