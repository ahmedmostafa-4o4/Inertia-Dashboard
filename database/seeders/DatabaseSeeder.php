<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Category::factory(10)->create();
        Product::factory(100)->create();

        // Admin::factory()->create([
        //     'name' => "Ahmed Mostafa",
        //     'email' => "lofylofy56@gmail.com",
        //     'password' => Hash::make("Lofylofy56"),
        //     'phone_number' => "01025250321",
        //     'role' => "owner",
        //     'created_at' => now(),
        //     'updated_at' => now(),
        //     'created_by' => "Ahmed Mostafa",
        //     'updated_by' => "Ahmed Mostafa",
        // ]);
    }
}
