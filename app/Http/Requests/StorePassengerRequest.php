<?php

namespace App\Http\Requests;

use App\Models\Passenger;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StorePassengerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                'name' => 'required|string|max:255',
                'phone_number' => 'required|string|max:15|regex:/^\+?[0-9]+$/', // Adjust regex based on your phone number format
                'email' => 'required|string|email|max:255|unique:passengers,email',
                'address' => 'required|string|max:255',
                'rating' => 'required|json', // Ensure the input is valid JSON
                'trip_history' => 'nullable|json', // Optional valid JSON
                'saved_payment_methods' => 'nullable|json', // Optional valid JSON
                'password' => ['required', 'confirmed', Password::min(8)->numbers()->mixedCase()],
                'email_verified_at' => 'nullable|date', // Optional date format

        ];
    }
}
