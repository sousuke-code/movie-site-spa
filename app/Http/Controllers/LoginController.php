<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        try {
          if (Auth::attempt($credentials)) {
              $request->session()->regenerate();
              return response()->json(Auth::user());
          }
      } catch (Exception $e) {
          return response()->json(['error' => 'ログイン中にエラーが発生しました。'], 500);
      }
  
      return response()->json([], 401);
    }

    /**
     * @param  Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request)
    {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return response()->json(true);
    }
}