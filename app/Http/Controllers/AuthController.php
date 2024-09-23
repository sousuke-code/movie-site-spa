<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    // ログイン処理
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return response()->json(['message' => 'ログイン成功'], 200);
        }

        return response()->json(['message' => 'ログイン失敗'], 401);
    }

    // ログアウト処理
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'ログアウト成功']);
    }

    // 認証済みユーザーの情報取得
    public function user(Request $request)
    {
        return response()->json($request->user());
    }
}
