<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePassengerRequest;
use App\Models\Passenger;
use App\Notifications\OTPNotification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Notification;

class RegisteredPassengerController extends Controller
{

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StorePassengerRequest $request)
    {
        $fields = $request->validated();
        $user = Passenger::create($fields);

        event(new Registered($user));

        Auth::login($user);

        $token = $user->createToken('API Token')->plainTextToken;
        
    
        $otp = random_int(100000, 999999); // Generate a 6-digit OTP
    
        // Save OTP in session or database for verification
        session(['otp' => $otp, 'otp_expiration' => now()->addMinutes(5)]);
    
        // Send the OTP via notification
        Notification::route('mail', $fields['email'])
            ->notify(new OTPNotification($otp));

        return response()->json([
            'user' => $user,
            'token' => $token,
            'message' => 'OTP sent, please verify your email.'
        ], 201); // 201 Created status for successful registration
    }

    public function sendOtp(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email', // Or 'phone' for SMS
    ]);

    if ($validated['email'] !== $request->user()->email) {
        return response()->json([
            'message' => 'The email provided does not match your account email.',
        ], 400);
    }
    
    // Check if the email is already verified
    if ($request->user()->email_verified_at) {
        return response()->json([
            'message' => 'This email is already verified at ' . $request->user()->email_verified_at,
        ]);
    }

    $otp = random_int(100000, 999999); // Generate a 6-digit OTP

    // Save OTP in session or database for verification
    session(['otp' => $otp, 'otp_expiration' => now()->addMinutes(5)]);

    // Send the OTP via notification
    Notification::route('mail', $validated['email'])
        ->notify(new OTPNotification($otp));

    return response()->json(['message' => 'OTP sent successfully!', 'otp' => session(key: 'otp')]);
}


public function verifyOtp(Request $request)
{
    $validated = $request->validate([
        'otp' => 'required|numeric',
    ]);

    $storedOtp = session('otp');
    $expiration = session('otp_expiration');

    if (!$storedOtp || now()->greaterThan($expiration)) {
        return response()->json(['message' => 'OTP expired or invalid'], 400);
    }

    if ($storedOtp != $validated['otp']) {
        return response()->json(['message' => 'Incorrect OTP'], 400);
    }

    // Mark user as verified (if applicable)
    if ($user = $request->user()) {
        $user->update(['email_verified_at' => now()]);
    }

    // Clear OTP from session
    session()->forget(['otp', 'otp_expiration']);

    return response()->json(['message' => 'OTP verified successfully!']);
}

public function resendOtp(Request $request)
{
    $validated = $request->validate([
        'email' => 'required|email', // Use 'phone' for SMS if needed
    ]);
    if ($validated['email'] !== $request->user()->email) {
        return response()->json([
            'message' => 'The email provided does not match your account email.',
        ], 400);
    }
    
    // Check if the email is already verified
    if ($request->user()->email_verified_at) {
        return response()->json([
            'message' => 'This email is already verified at ' . $request->user()->email_verified_at,
        ]);
    }
    // Check if the previous OTP exists and is still valid
    $existingOtp = session('otp');
    $expiration = session('otp_expiration');

    if ($existingOtp && now()->lessThan($expiration)) {
        $remainingSeconds = now()->diffInSeconds($expiration);

        return response()->json([
            'message' => 'Please wait before requesting a new OTP.',
            'remaining_time' => $remainingSeconds,
        ], 429);
    }

    // Generate a new OTP
    $otp = random_int(100000, 999999);

    // Save the new OTP in the session
    session(['otp' => $otp, 'otp_expiration' => now()->addMinutes(5)]);

    // Send the OTP
    Notification::route('mail', $validated['email'])
        ->notify(new OTPNotification($otp));

    return response()->json(['message' => 'OTP resent successfully!']);
}


}
