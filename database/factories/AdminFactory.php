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

            'name' => fake()->name(),
            'email' => fake()->email(),
            'password' => Hash::make("Lofylofy56"),
            'phone_number' => fake()->phoneNumber(),
            'role' => "owner",
            'created_at' => now(),
            'updated_at' => now(),
            'created_by' => fake()->name(),
            'updated_by' => fake()->name(),


        ];
    }
}
