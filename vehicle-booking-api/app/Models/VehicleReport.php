<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VehicleReport extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'driver_id', 'vehicle_id', 'service_date', 'operation_date', 'fuel_type', 'fuel_usage', 'description'];
}
