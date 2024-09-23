<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });
Route::get('{any}', function() {
    return view('app');
})->where('any', '.*');



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
