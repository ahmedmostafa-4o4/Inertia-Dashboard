<?php

namespace Database\Factories;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->words(3, true),
            'images' => json_encode([
                'image1' =>
                $this->faker->imageUrl(640, 480, 'product', true, 'Faker'),
                'image2' =>
                $this->faker->imageUrl(640, 480, 'product', true, 'Faker'),
                'image3' =>
                $this->faker->imageUrl(640, 480, 'product', true, 'Faker'),
                'image4' =>
                $this->faker->imageUrl(640, 480, 'product', true, 'Faker')
            ]),
            'category_id' => Category::inRandomOrder()->first()->id,
            'description' => $this->faker->paragraph,
            'options' => json_encode([
    'colors' => $this->faker->randomElements(['red', 'blue', 'green'], $count = rand(1, 3)),
    'sizes' => $this->faker->randomElements(['S', 'M', 'L', 'XL'], $count = rand(1, 4)),
]),

            'price' => $this->faker->randomFloat(2, 10, 1000),
            'stock' => $this->faker->numberBetween(0, 100),
            'rate' => $this->faker->randomFloat(1, 1, 5),
            'rate_count' => $this->faker->numberBetween(0, 1000),
            'offer' => $this->faker->randomFloat(2, 0, 100), // Percentage discount (0 to 100)
            'created_by' => Admin::inRandomOrder()->first()->id,
            'updated_by' => Admin::inRandomOrder()->first()->id,
            'created_at' => now(),
            'updated_at' => now(),

        ];
    }
}
