<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Booking
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $driver_id
 * @property string $booking_date
 * @property string $destination
 * @property string $purpose
 * @property string $status
 * @property int|null $start_km
 * @property int|null $end_km
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $started_at
 * @property \Illuminate\Support\Carbon|null $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $driver
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking query()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereBookingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereDestination($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereDriverId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereEndKm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking wherePurpose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereStartKm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Booking pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Booking approved()
 * @method static \Database\Factories\BookingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Booking extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'driver_id',
        'booking_date',
        'destination',
        'purpose',
        'status',
        'start_km',
        'end_km',
        'approved_at',
        'started_at',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'booking_date' => 'date',
        'approved_at' => 'datetime',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'start_km' => 'integer',
        'end_km' => 'integer',
    ];

    /**
     * Get the user that made the booking.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the driver assigned to the booking.
     */
    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    /**
     * Scope a query to only include pending bookings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include approved bookings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    /**
     * Get the total kilometers traveled.
     */
    public function getTotalKmAttribute(): ?int
    {
        if ($this->start_km && $this->end_km) {
            return $this->end_km - $this->start_km;
        }
        return null;
    }
}