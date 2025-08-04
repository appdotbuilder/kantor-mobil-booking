<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StartTripRequest extends FormRequest
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
            'start_km' => 'required|integer|min:0',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'start_km.required' => 'Kilometer awal wajib diisi.',
            'start_km.integer' => 'Kilometer awal harus berupa angka.',
            'start_km.min' => 'Kilometer awal tidak boleh negatif.',
        ];
    }
}