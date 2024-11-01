<?php

namespace App\Http\Requests;

use App\Models\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0.1'],
            'stock' => ['required', 'numeric', 'min:1'],
            'offer' => ['nullable', 'numeric', 'min:1'],
            'images.image1' => ['required', 'image', 'mimes:jpeg,png,jpg', 'max:2048'], // Max 2MB per image
            'images.image2' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'images.image3' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'images.image4' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'category_id' => [
                'required',
                Rule::in(Category::pluck('id')->toArray()) // Ensures the category exists
            ],
        ];
    }
}
