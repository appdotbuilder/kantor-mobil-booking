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
        Schema::table('users', function (Blueprint $table) {
            $table->enum('role', ['user', 'driver', 'admin'])->default('user')->after('email');
            $table->boolean('is_available')->default(true)->after('role')->comment('For drivers - availability status');
            $table->enum('status', ['ready', 'on_trip'])->default('ready')->after('is_available')->comment('For drivers - current status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'is_available', 'status']);
        });
    }
};