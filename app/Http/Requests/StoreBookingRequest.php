<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookingRequest extends FormRequest
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
            'booking_date' => 'required|date|after_or_equal:today',
            'destination' => 'required|string|max:255',
            'purpose' => 'required|string|max:1000',
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
            'booking_date.required' => 'Tanggal pemesanan wajib diisi.',
            'booking_date.date' => 'Format tanggal tidak valid.',
            'booking_date.after_or_equal' => 'Tanggal pemesanan tidak boleh kurang dari hari ini.',
            'destination.required' => 'Tujuan perjalanan wajib diisi.',
            'destination.max' => 'Tujuan perjalanan maksimal 255 karakter.',
            'purpose.required' => 'Alasan pemesanan wajib diisi.',
            'purpose.max' => 'Alasan pemesanan maksimal 1000 karakter.',
        ];
    }
}