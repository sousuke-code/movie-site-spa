<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}
