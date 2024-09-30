<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Review;

class ReviewController extends Controller
{
    public function index($id)
    {

        $reviews = Review::where('movie_id', $id)->with('user')->latest()->take(3)->get();
        

        return response()->json([
            'status' => 200,
            'reviews' => $reviews
        ]);
    }

    public function register(Request $request) {

        $reviie = Review::create([
            'user_id' => Auth::id(),
            'review' => $request->review,
            'movie_id' => $request->movie_id,
            'user_name' => $request->user_name,
            'rating' => $request->score,
        ]);

        return response()->json([
            'status' => 200,
        ]);
    }
}
