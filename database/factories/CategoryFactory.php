<?php

namespace Database\Factories;

use App\Models\Admin;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    protected $model = Category::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(2, true), // Generates a random 2-word title
            'created_by' => Admin::factory(),        // Associates with an Admin user for created_by
            'updated_by' => Admin::factory(),        // Associates with an Admin user for updated_by
            'created_at' => now(),                   // Sets the current timestamp
            'updated_at' => now(),                   // Sets the current timestamp
        ];
    }
}
