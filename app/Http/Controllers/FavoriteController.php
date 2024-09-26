<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\FavoriteMovie;

class FavoriteController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'movie_id' => 'required|integer'
        ]);

        $favorite = FavoriteMovie::create([
            'user_id' => Auth::id(),
            'movie_id' => $request->movie_id,
        ]);

        return response()->json([
            'status' => 200,
            'message' => 'favorite successfully',
        ]);
    }
}
