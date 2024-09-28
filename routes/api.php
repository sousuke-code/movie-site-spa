<?php

use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;
use App\Models\User;


Route::post('register', [LoginController::class, 'register']);
Route::post('login',[LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('users', function () {
    return User::all();
});

Route::get('/review/{id}',[ReviewController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('favorite', [FavoriteController::class, 'store']);
    Route::get('homepage',[ProfileController::class, 'show']);
    Route::post('logout',[LoginController::class, 'logout']); 
});

