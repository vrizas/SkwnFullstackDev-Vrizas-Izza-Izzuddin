<?php

use App\Http\Controllers\Api\ApprovalController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DirectorController;
use App\Http\Controllers\Api\DriverController;
use App\Http\Controllers\Api\ManagerController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\VehicleController;
use App\Http\Controllers\Api\VehicleReportController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/users/me', [UserController::class, 'me'])->middleware('auth:sanctum');
Route::apiResource('/drivers', DriverController::class)->middleware('auth:sanctum');
Route::apiResource('/managers', ManagerController::class)->middleware('auth:sanctum');
Route::apiResource('/directors', DirectorController::class)->middleware('auth:sanctum');
Route::apiResource('/vehicles', VehicleController::class)->middleware('auth:sanctum');
Route::get('/vehicle-reports/export', [VehicleReportController::class, 'exportExcel'])->middleware('auth:sanctum');
Route::apiResource('/vehicle-reports', VehicleReportController::class)->middleware('auth:sanctum');
Route::apiResource('/approvals', ApprovalController::class)->middleware('auth:sanctum');
Route::apiResource('/roles', RoleController::class)->middleware('auth:sanctum');
Route::post('/vehicle-reports/{id}/approve', [VehicleReportController::class, 'approve'])->middleware('auth:sanctum');
Route::post('/vehicle-reports/{id}/mark-as-done', [VehicleReportController::class, 'markAsDone'])->middleware('auth:sanctum');

