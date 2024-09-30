<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => "Ahmed Mostafa",
            'email' => "admin@gmail.com",
            'password' => Hash::make("Lofylofy56"),
            'phone_number' => "01025250321",
            'role' => "owner",
            'created_at' => now(),
            'updated_at' => now(),
            'created_by' => "Ahmed Mostafa",
            'updated_by' => "Ahmed Mostafa",
        ];
    }
}
