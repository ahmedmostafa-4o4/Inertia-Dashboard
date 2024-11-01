<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'created_by',
        'updated_by',
    ];

    public function created_with()
    {
        return $this->belongsTo(Admin::class, 'created_by');
    }
    public function updated_with()
    {
        return $this->belongsTo(Admin::class, 'updated_by');
    }
}
