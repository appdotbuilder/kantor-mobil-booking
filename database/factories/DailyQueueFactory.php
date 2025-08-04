<?php

namespace Database\Factories;

use App\Models\DailyQueue;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DailyQueue>
 */
class DailyQueueFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\DailyQueue>
     */
    protected $model = DailyQueue::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'queue_date' => $this->faker->date(),
            'driver_order' => [],
            'reset_approved' => false,
        ];
    }
}