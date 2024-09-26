<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FavoriteMovie;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ProfileController extends Controller
{
    public function show()
    {
        $id = Auth::id();
        $user = User::findOrFail($id);

        $favorites = FavoriteMovie::where('user_id',$id)->get();
        $movies = [];

        foreach ($favorites as $favorite){
            $response = Http::withToken('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYWM5NDljYzY4Y2Q4YmQ4ZDYxMTBiMzJiZjk5MWNkMCIsInN1YiI6IjY2NDE2M2NjYTU4MjQyNmZiZTAxNmUzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UgsYuOWABbPG9_FPTfMyNScwKzGe0Zn_ymeclhm0YVg')
                ->get('https://api.themoviedb.org/3/movie/' . $favorite->movie_id . '?append_to_response=credits,image,videos');
    
            if($response->successful()){
                $movie = $response->json();
                $movies[] = $movie;
            }   
        }

        return response()->json([
           'status' => 200,
           'movies' => $movies,
        ]);

    }
}
