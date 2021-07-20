<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Game extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['outcome', 'details'];

    public function monty()
    {
        return $this->belongsTo(Monty::class);
    }

    /* each game points to the cookie of the user who played it */
    public function cookie()
    {
        return $this->belongsTo(Cookie::class);
    }
}