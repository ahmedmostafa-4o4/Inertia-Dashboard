<?php

namespace App\Http\Controllers;

use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class UserAuthController extends Controller
{



    public function login(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Attempt to authenticate the user
        $credentials = $request->only('email', 'password');

        if (Auth::guard('web')->attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            // Delete all existing tokens for the user to prevent multiple active sessions

            // Generate a new token
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token,
                'message' => 'Login successful'
            ], 200); // 200 for successful login
        }

        // If authentication fails, return an error response
        return response()->json([
            'message' => 'Invalid credentials'
        ], 401); // 401 for unauthorized access
    }



    public function update(UpdateUserRequest $request, User $user)
    {
        $fields = $request->validated();

        // Use existing image if no new image is uploaded
        $fields['image'] = $fields['image'] ?? $request->user()->image;

        // Handle image replacement if a new image is uploaded
        if ($fields['image'] instanceof \Illuminate\Http\UploadedFile) {
            // Delete old image directory if it exists
            if ($request->user()->image) {
                Storage::disk('public')->deleteDirectory(dirname($request->user()->image));
            }
            // Store the new image
            $fields['image'] = $fields['image']->store('users/' . Str::random(10), 'public');
        }

        // Update user fields and save
        $request->user()->fill($fields);
        $request->user()->save();

        // Return a structured JSON response
        return response()->json([
            'message' => 'User updated successfully',
            'data' => $fields,
        ], 200);
    }




    public function logout(Request $request)
    {
        // Check if the user is authenticated using Sanctum
        if ($request->user()) {
            // Revoke the user's token (if using token-based authentication)
            $request->user()->currentAccessToken()->delete(); // Only delete the current token
        }

        // Invalidate the session if applicable
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Return a success response
        return response()->json(['message' => 'Successfully logged out.'], 200);
    }


    public function changePassword(Request $request, User $user)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'confirmed', Password::min(8)->numbers()->mixedCase()]
        ]);

        $user = $request->user();
        $user->update([
            'password' => Hash::make($request->password),
        ]);
        return response()->json(['success' => 'Your password has been changed']);
    }


    public function destroy(Request $request, User $user)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();
        Storage::disk('public')->deleteDirectory(dirname(
            $user->image_path
        ));
        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => 'Your account has been deleted']);
    }
}
