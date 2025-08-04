<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompleteTripRequest extends FormRequest
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
            'end_km' => 'required|integer|min:' . ($this->booking->start_km ?? 0),
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
            'end_km.required' => 'Kilometer akhir wajib diisi.',
            'end_km.integer' => 'Kilometer akhir harus berupa angka.',
            'end_km.min' => 'Kilometer akhir harus lebih besar dari kilometer awal.',
        ];
    }
}