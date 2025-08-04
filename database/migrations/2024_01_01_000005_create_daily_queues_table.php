<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_queues', function (Blueprint $table) {
            $table->id();
            $table->date('queue_date');
            $table->json('driver_order')->comment('Array of driver IDs in queue order');
            $table->boolean('reset_approved')->default(false);
            $table->timestamp('reset_approved_at')->nullable();
            $table->timestamps();

            // Indexes for performance
            $table->unique('queue_date');
            $table->index('reset_approved');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_queues');
    }
};