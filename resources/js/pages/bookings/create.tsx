import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

export default function CreateBooking() {
    const form = useForm({
        booking_date: '',
        destination: '',
        purpose: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post(route('bookings.store'));
    };

    return (
        <AppLayout>
            <Head title="Buat Pemesanan Baru" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        ➕ Buat Pemesanan Baru
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Isi form di bawah untuk membuat pemesanan mobil kantor.
                    </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📅 Tanggal Pemesanan *
                            </label>
                            <input
                                type="date"
                                value={form.data.booking_date}
                                onChange={e => form.setData('booking_date', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                min={new Date().toISOString().split('T')[0]}
                                required
                            />
                            {form.errors.booking_date && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.booking_date}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                🎯 Tujuan Perjalanan *
                            </label>
                            <input
                                type="text"
                                value={form.data.destination}
                                onChange={e => form.setData('destination', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Contoh: Kantor Pusat Jakarta"
                                required
                            />
                            {form.errors.destination && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.destination}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                📝 Alasan Pemesanan *
                            </label>
                            <textarea
                                value={form.data.purpose}
                                onChange={e => form.setData('purpose', e.target.value)}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Jelaskan alasan atau keperluan perjalanan..."
                                required
                            />
                            {form.errors.purpose && (
                                <p className="mt-1 text-sm text-red-600">{form.errors.purpose}</p>
                            )}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 dark:bg-blue-900/20 dark:border-blue-800">
                            <div className="flex">
                                <div className="text-blue-400 text-xl mr-3">ℹ️</div>
                                <div className="text-sm text-blue-800 dark:text-blue-200">
                                    <p className="font-medium mb-1">Informasi Penting:</p>
                                    <ul className="list-disc list-inside space-y-1">
                                        <li>Semua pemesanan memerlukan persetujuan admin</li>
                                        <li>Driver akan ditugaskan setelah pemesanan disetujui</li>
                                        <li>Anda akan mendapat notifikasi status pemesanan</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                ← Kembali
                            </Button>
                            <Button
                                type="submit"
                                disabled={form.processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {form.processing ? '⏳ Menyimpan...' : '🚀 Buat Pemesanan'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </AppLayout>
    );
}