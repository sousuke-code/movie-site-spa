<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\LoginController;
use Illuminate\Support\Facades\Route;
use App\Models\User;


Route::post('register', [LoginController::class, 'register']);
Route::post('login',[LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('users', function () {
    return User::all();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('favorite', [FavoriteController::class, 'store']);
    Route::post('logout',[LoginController::class, 'logout']); 
});

