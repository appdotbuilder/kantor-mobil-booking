import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

interface Stats {
    total_drivers: number;
    available_drivers: number;
    on_trip_drivers: number;
}

interface User {
    id: number;
    name: string;
}

interface Booking {
    id: number;
    booking_date: string;
    destination: string;
    purpose: string;
    status: string;
    user: User;
    driver?: User;
}

interface Driver {
    id: number;
    name: string;
    status: string;
    is_available: boolean;
}

interface DailyQueue {
    id: number;
    queue_date: string;
    driver_order: number[];
    reset_approved: boolean;
}

interface Props {
    stats: Stats;
    pending_bookings: Booking[];
    today_bookings: Booking[];
    drivers: Driver[];
    today_queue?: DailyQueue;
    [key: string]: unknown;
}

export default function AdminDashboard({ 
    stats, 
    pending_bookings, 
    today_bookings, 
    drivers, 
    today_queue 
}: Props) {
    const handleApproveBooking = (bookingId: number) => {
        router.patch(route('bookings.update', bookingId), {
            status: 'approved'
        });
    };

    const handleRejectBooking = (bookingId: number) => {
        router.patch(route('bookings.update', bookingId), {
            status: 'rejected'
        });
    };

    const handleResetQueue = () => {
        if (confirm('Apakah Anda yakin ingin mereset antrean driver untuk hari berikutnya?')) {
            router.post(route('admin.queue.reset'));
        }
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
            approved: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
            rejected: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
            in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
            completed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400',
        };
        
        const statusText = {
            pending: 'Menunggu',
            approved: 'Disetujui',
            rejected: 'Ditolak',
            in_progress: 'Dalam Perjalanan',
            completed: 'Selesai',
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badges[status as keyof typeof badges] || badges.pending}`}>
                {statusText[status as keyof typeof statusText] || status}
            </span>
        );
    };

    return (
        <AppLayout>
            <Head title="Dashboard Admin" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        ⚙️ Dashboard Admin
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Kelola sistem pemesanan mobil kantor dan pantau aktivitas driver.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-3">
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-500 rounded-full">
                                <div className="text-white text-xl">👥</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Driver
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.total_drivers}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-500 rounded-full">
                                <div className="text-white text-xl">✅</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Driver Tersedia
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.available_drivers}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 bg-orange-500 rounded-full">
                                <div className="text-white text-xl">🚗</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Dalam Perjalanan
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {stats.on_trip_drivers}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pending Approvals */}
                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                ⏳ Menunggu Persetujuan
                            </h2>
                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900/20 dark:text-yellow-400">
                                {pending_bookings.length} pemesanan
                            </span>
                        </div>
                        
                        {pending_bookings.length > 0 ? (
                            <div className="space-y-4">
                                {pending_bookings.map((booking) => (
                                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
                                        <div className="grid gap-4 md:grid-cols-4">
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Pemesan</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {booking.user.name}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Tanggal</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {new Date(booking.booking_date).toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Tujuan</p>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {booking.destination}
                                                </p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button
                                                    onClick={() => handleApproveBooking(booking.id)}
                                                    size="sm"
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    ✅ Setujui
                                                </Button>
                                                <Button
                                                    onClick={() => handleRejectBooking(booking.id)}
                                                    size="sm"
                                                    variant="outline"
                                                    className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    ❌ Tolak
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <strong>Alasan:</strong> {booking.purpose}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">✅</div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Tidak ada pemesanan yang menunggu persetujuan
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Driver Status */}
                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            🚗 Status Driver
                        </h2>
                        
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {drivers.map((driver) => (
                                <div key={driver.id} className="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-gray-900 dark:text-white">
                                            {driver.name}
                                        </h3>
                                        <div className={`w-3 h-3 rounded-full ${
                                            driver.status === 'ready' ? 'bg-green-500' : 'bg-blue-500'
                                        }`}></div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                        {driver.status === 'ready' ? '✅ Siap' : '🚗 Dalam Perjalanan'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {driver.is_available ? 'Tersedia' : 'Tidak Tersedia'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Queue Management */}
                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                📋 Manajemen Antrean
                            </h2>
                            <Button
                                onClick={handleResetQueue}
                                className="bg-blue-600 hover:bg-blue-700"
                                disabled={today_queue?.reset_approved}
                            >
                                🔄 Reset Antrean Hari Ini
                            </Button>
                        </div>
                        
                        {today_queue ? (
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Tanggal: {new Date(today_queue.queue_date).toLocaleDateString('id-ID')}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Status Reset: {today_queue.reset_approved ? '✅ Sudah direset' : '⏳ Belum direset'}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400">
                                Belum ada antrean untuk hari ini
                            </p>
                        )}
                    </div>
                </div>

                {/* Today's Bookings */}
                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            📅 Pemesanan Hari Ini
                        </h2>
                        
                        {today_bookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Pemesan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Tujuan
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Driver
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                        {today_bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {booking.user.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {booking.destination}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {booking.driver?.name || '-'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(booking.status)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-4">📅</div>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Tidak ada pemesanan untuk hari ini
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </AppLayout>
    );
}