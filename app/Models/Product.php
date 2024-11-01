<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'images',
        'category_id',
        'description',
        'options',
        'price',
        'stock',
        'rate',
        'rate_count',
        'offer',
        'created_by',
        'updated_by'
    ];


    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }
    public function created_with()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }
    public function updated_with()
    {
        return $this->belongsTo(Admin::class, 'updated_by');
    }
}
