<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;
use App\Models\User;



Route::post('login',[LoginController::class, 'login']);
Route::post('logout',[LoginController::class, 'logout']);
Route::middleware('auth:sanctum')->get('users', function () {
    return User::all();
});

