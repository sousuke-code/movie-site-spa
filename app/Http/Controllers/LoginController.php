<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Dotenv\Validator as DotenvValidator;
use Illuminate\Support\Facades\Hash;
use Validator;

class LoginController extends Controller
{
    public function login(Request $request) {
        $validator = Validator::make($request->all(), [
            'email'=>'required',
            'password'=>'required',
        ]);

        if ($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        } else {
            $user = User::where('email', $request->email)->first();
            if (! $user) {
                return response()->json([
                    'status'=>401,
                    'message'=>'ユーザーが存在しません',
                ]);
            } else if (! Hash::check($request->password, $user->password)){
							return response()->json([
								'status' => 401,
								'message' => 'パスワードが異なります'
							]);
						} else {
                $token = $user->createToken($user->email.'_Token')->plainTextToken;

                return response()->json([
                    'status'=>200,
                    'userid' => $user->id,
                    'username'=>$user->name,
                    'token'=>$token,
                    'message'=>'ログインに成功しました。'
                ]);
            }
        }
    }
   

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
        ]);

        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->messages(),
            ]);
        } else {
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);

            $token = $user->createToken($user->email.'_Token')->plainTextToken;

            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'token'=>$token,
                'message'=>'Registerd Successfully'
            ]);
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logout successfully',
        ]);
    }
}
