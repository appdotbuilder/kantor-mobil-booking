import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface Driver {
    id: number;
    name: string;
    status: string;
    is_available: boolean;
}

interface Booking {
    id: number;
    booking_date: string;
    destination: string;
    purpose: string;
    status: string;
    start_km?: number;
    end_km?: number;
    user: {
        name: string;
    };
}

interface Props {
    driver: Driver;
    currentBooking?: Booking;
    [key: string]: unknown;
}

export default function DriverDashboard({ driver, currentBooking }: Props) {
    const [showStartModal, setShowStartModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);

    const startForm = useForm({
        start_km: '',
    });

    const completeForm = useForm({
        end_km: '',
    });

    const handleStartTrip = (e: React.FormEvent) => {
        e.preventDefault();
        startForm.post(route('driver.trips.start'), {
            onSuccess: () => {
                setShowStartModal(false);
                startForm.reset();
            }
        });
    };

    const handleCompleteTrip = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentBooking) {
            completeForm.patch(route('driver.trips.complete', currentBooking.id), {
                onSuccess: () => {
                    setShowCompleteModal(false);
                    completeForm.reset();
                }
            });
        }
    };

    const getStatusDisplay = (status: string) => {
        const statusConfig = {
            ready: { text: 'Siap', color: 'bg-green-500', emoji: '✅' },
            on_trip: { text: 'Dalam Perjalanan', color: 'bg-blue-500', emoji: '🚗' },
        };
        
        return statusConfig[status as keyof typeof statusConfig] || statusConfig.ready;
    };

    const statusDisplay = getStatusDisplay(driver.status);

    return (
        <AppLayout>
            <Head title="Dashboard Driver" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        🚗 Dashboard Driver
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Selamat datang, {driver.name}! Kelola perjalanan Anda di sini.
                    </p>
                </div>

                {/* Driver Status Card */}
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        📊 Status Saat Ini
                    </h2>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className={`w-4 h-4 rounded-full ${statusDisplay.color}`}></div>
                            <span className="text-lg font-medium text-gray-900 dark:text-white">
                                {statusDisplay.emoji} {statusDisplay.text}
                            </span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Ketersediaan: {driver.is_available ? '✅ Tersedia' : '❌ Tidak Tersedia'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Current Booking */}
                {currentBooking && (
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            🎯 Pemesanan Aktif
                        </h2>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Pemesan</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {currentBooking.user.name}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {new Date(currentBooking.booking_date).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Tujuan</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {currentBooking.destination}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                                <p className="font-medium text-gray-900 dark:text-white">
                                    {currentBooking.status === 'approved' ? '✅ Disetujui' : 
                                     currentBooking.status === 'in_progress' ? '🚗 Dalam Perjalanan' : 
                                     currentBooking.status}
                                </p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">Alasan</p>
                            <p className="font-medium text-gray-900 dark:text-white">
                                {currentBooking.purpose}
                            </p>
                        </div>

                        {currentBooking.start_km && (
                            <div className="mt-4 grid gap-4 md:grid-cols-2">
                                <div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Kilometer Awal</p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {currentBooking.start_km.toLocaleString('id-ID')} km
                                    </p>
                                </div>
                                {currentBooking.end_km && (
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Kilometer Akhir</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {currentBooking.end_km.toLocaleString('id-ID')} km
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        ⚡ Aksi Cepat
                    </h2>
                    
                    <div className="flex flex-wrap gap-4">
                        {currentBooking?.status === 'approved' && (
                            <Button
                                onClick={() => setShowStartModal(true)}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                🚀 Mulai Perjalanan
                            </Button>
                        )}
                        
                        {currentBooking?.status === 'in_progress' && (
                            <Button
                                onClick={() => setShowCompleteModal(true)}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                ✅ Selesaikan Perjalanan
                            </Button>
                        )}
                        
                        {!currentBooking && (
                            <div className="text-center py-8 w-full">
                                <div className="text-4xl mb-4">😊</div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Tidak ada pemesanan aktif saat ini. Anda siap menerima pemesanan baru!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>

            {/* Start Trip Modal */}
            {showStartModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            🚀 Mulai Perjalanan
                        </h3>
                        
                        <form onSubmit={handleStartTrip}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kilometer Awal
                                </label>
                                <input
                                    type="number"
                                    value={startForm.data.start_km}
                                    onChange={e => startForm.setData('start_km', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan kilometer awal"
                                    required
                                />
                                {startForm.errors.start_km && (
                                    <p className="mt-1 text-sm text-red-600">{startForm.errors.start_km}</p>
                                )}
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    onClick={() => setShowStartModal(false)}
                                    variant="outline"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={startForm.processing}
                                    className="bg-green-600 hover:bg-green-700"
                                >
                                    Mulai Perjalanan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Complete Trip Modal */}
            {showCompleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md dark:bg-gray-800">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            ✅ Selesaikan Perjalanan
                        </h3>
                        
                        <form onSubmit={handleCompleteTrip}>
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Kilometer Awal: {currentBooking?.start_km?.toLocaleString('id-ID')} km
                                </p>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Kilometer Akhir
                                </label>
                                <input
                                    type="number"
                                    value={completeForm.data.end_km}
                                    onChange={e => completeForm.setData('end_km', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    placeholder="Masukkan kilometer akhir"
                                    min={currentBooking?.start_km || 0}
                                    required
                                />
                                {completeForm.errors.end_km && (
                                    <p className="mt-1 text-sm text-red-600">{completeForm.errors.end_km}</p>
                                )}
                            </div>
                            
                            <div className="flex justify-end space-x-3">
                                <Button
                                    type="button"
                                    onClick={() => setShowCompleteModal(false)}
                                    variant="outline"
                                >
                                    Batal
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={completeForm.processing}
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Selesaikan
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}