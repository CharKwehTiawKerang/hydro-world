<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Fishs extends Model
{
    use HasFactory;
    protected $table = 'fish';
    protected $fillable = ['common_name', 'name_bm', 'family', 'description', 'diet', 'image_url', 'type'];
}
