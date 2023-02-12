<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            [
                'id' => 'uE9VpZOPTt9gQdOFS0te6',
                'name' => 'admin',
                'active' => 1,
            ], 
            [
                'id' => 'QuGEBcLQ17l33GqQ84d9I',
                'name' => 'manager',
                'active' => 1,
            ], 
            [
                'id' => 'HBOTpVhUJtoRUqX1EqvfQ',
                'name' => 'director',
                'active' => 1,
            ], 
        ]);

        DB::table('users')->insert([
            [
                'role_id' => 'uE9VpZOPTt9gQdOFS0te6',
                'username' => 'admin',
                'password' => Hash::make('password123'),
            ], 
            [
                'role_id' => 'QuGEBcLQ17l33GqQ84d9I',
                'username' => 'manajer',
                'password' => Hash::make('password123'),
            ],
            [
                'role_id' => 'HBOTpVhUJtoRUqX1EqvfQ',
                'username' => 'direktur',
                'password' => Hash::make('password123'),
            ],
        ]);

        DB::table('drivers')->insert([
            [
                'name' => 'Budi',
            ], 
            [
                'name' => 'Roni',
            ], 
            [
                'name' => 'Malik',
            ], 
        ]);

        DB::table('vehicles')->insert([
            [
                'name' => 'Hino',
                'active' => 1,
            ], 
            [
                'name' => 'Mitsubishi',
                'active' => 1,
            ], 
            [
                'name' => 'Isuzu',
                'active' => 1,
            ], 
        ]);

        DB::table('vehicle_reports')->insert([
            [
                'user_id' => 1,
                'vehicle_id' => 1,
                'driver_id' => 1,
                'service_date' => '2023-01-01',
                'operation_date' => '2023-01-02',
                'fuel_type' => 'Pertamina Dex',
                'fuel_usage' => 400,
                'description' => 'Penambangan di Cabang A',
            ], 
            [
                'user_id' => 1,
                'vehicle_id' => 1,
                'driver_id' => 1,
                'service_date' => '2023-01-01',
                'operation_date' => '2023-01-03',
                'fuel_type' => 'Pertamina Dex',
                'fuel_usage' => 500,
                'description' => 'Penambangan di Cabang A',
            ], 
            [
                'user_id' => 1,
                'vehicle_id' => 2,
                'driver_id' => 2,
                'service_date' => '2023-01-01',
                'operation_date' => '2023-01-04',
                'fuel_type' => 'Pertamina Dex',
                'fuel_usage' => 500,
                'description' => 'Penambangan di Cabang B',
            ], 
            [
                'user_id' => 1,
                'vehicle_id' => 2,
                'driver_id' => 2,
                'service_date' => '2023-01-01',
                'operation_date' => '2023-01-05',
                'fuel_type' => 'Pertamina Dex',
                'fuel_usage' => 300,
                'description' => 'Penambangan di Cabang B',
            ], 
            [
                'user_id' => 1,
                'vehicle_id' => 3,
                'driver_id' => 3,
                'service_date' => '2023-01-01',
                'operation_date' => '2023-01-06',
                'fuel_type' => 'Pertamina Dex',
                'fuel_usage' => 800,
                'description' => 'Penambangan di Cabang C',
            ], 
            [
                'user_id' => 1,
                'vehicle_id' => 3,
                'driver_id' => 3,
                'service_date' => '2023-01-01',
                'operation_date' => '2023-01-07',
                'fuel_type' => 'Pertamina Dex',
                'fuel_usage' => 700,
                'description' => 'Penambangan di Cabang C',
            ], 
        ]);

        DB::table('approvals')->insert([
            [
                'user_id' => 2,
                'vehicle_report_id' => 1,
                'approved' => 2,
            ], 
            [
                'user_id' => 3,
                'vehicle_report_id' => 1,
                'approved' => 2,
            ], 
            [
                'user_id' => 2,
                'vehicle_report_id' => 2,
                'approved' => 2,
            ], 
            [
                'user_id' => 3,
                'vehicle_report_id' => 2,
                'approved' => 2,
            ], 
            [
                'user_id' => 2,
                'vehicle_report_id' => 3,
                'approved' => 2,
            ], 
            [
                'user_id' => 3,
                'vehicle_report_id' => 3,
                'approved' => 2,
            ], 
            [
                'user_id' => 2,
                'vehicle_report_id' => 4,
                'approved' => 2,
            ], 
            [
                'user_id' => 3,
                'vehicle_report_id' => 4,
                'approved' => 2,
            ], 
            [
                'user_id' => 2,
                'vehicle_report_id' => 5,
                'approved' => 2,
            ], 
            [
                'user_id' => 3,
                'vehicle_report_id' => 5,
                'approved' => 2,
            ], 
            [
                'user_id' => 2,
                'vehicle_report_id' => 6,
                'approved' => 1,
            ], 
            [
                'user_id' => 3,
                'vehicle_report_id' => 6,
                'approved' => 0,
            ], 
        ]);
    }
}
