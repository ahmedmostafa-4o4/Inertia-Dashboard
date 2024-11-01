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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("title");
            $table->json("images");
            $table->foreignId('category_id')->index()->constrained()->onDelete('cascade'); // No name()
            $table->text("description");
            $table->json("options")->nullable();
            $table->float("price");
            $table->integer("stock")->nullable();
            $table->float("rate")->nullable();
            $table->mediumInteger("rate_count")->nullable();
            $table->float("offer")->nullable();
            $table->foreignId('created_by')->nullable()->index()->constrained('admins')->onDelete('set null'); // Automatically named
            $table->foreignId('updated_by')->nullable()->index()->constrained('admins')->onDelete('set null'); // Automatically named
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
