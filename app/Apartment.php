<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Apartment extends Model
{
    protected $fillable = ['name', 'size','price','rooms','floor'];
    public $timestamps = false;
}
