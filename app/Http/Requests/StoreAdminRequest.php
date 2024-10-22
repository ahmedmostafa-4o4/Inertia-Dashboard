<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class StoreAdminRequest extends FormRequest
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
            'name' => ['required', 'max:255'],
            'image_path' => ['nullable', 'image'],
            'phone_number' => ['string', 'digits_between:10,13', Rule::unique('admins')],
            'email' => ['email', 'required', Rule::unique('admins')],
            'role' => ['required', Rule::in('marketing', 'owner', 'sales')],
            'password' => ['required', 'confirmed', Password::min(8)->numbers()->mixedCase()]
        ];
    }
}
