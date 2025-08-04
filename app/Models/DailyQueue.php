<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\DailyQueue
 *
 * @property int $id
 * @property string $queue_date
 * @property array $driver_order
 * @property bool $reset_approved
 * @property \Illuminate\Support\Carbon|null $reset_approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue query()
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue whereDriverOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue whereQueueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue whereResetApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue whereResetApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DailyQueue whereUpdatedAt($value)
 * @method static \Database\Factories\DailyQueueFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class DailyQueue extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'queue_date',
        'driver_order',
        'reset_approved',
        'reset_approved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'queue_date' => 'date',
        'driver_order' => 'array',
        'reset_approved' => 'boolean',
        'reset_approved_at' => 'datetime',
    ];

    /**
     * Get today's queue.
     */
    public static function getToday()
    {
        return static::where('queue_date', today())->first();
    }

    /**
     * Get or create today's queue.
     */
    public static function getTodayOrCreate()
    {
        return static::firstOrCreate(
            ['queue_date' => today()],
            ['driver_order' => []]
        );
    }
}