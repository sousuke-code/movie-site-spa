<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TheaterController extends Controller
{
	public function index(Request $request)
	{
			$lat = $request->lat;
			$lng = $request->lng;
			$apiKey = env('VITE_GOOGLE_MAPS_API_KEY'); //

			$response = Http::get("https://maps.googleapis.com/maps/api/place/nearbysearch/json", [
					'location' => "{$lat},{$lng}",
					'radius' => 5000,
					'type' => 'movie_theater',
					'key' => $apiKey,
					'language' => 'ja',
			]);

			return $response->json(); // レスポンスをJSON形式で返す
	}
}
