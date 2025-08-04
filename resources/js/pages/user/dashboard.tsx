import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

interface Props {
    available_drivers: number;
    recent_bookings: Array<{
        id: number;
        booking_date: string;
        destination: string;
        purpose: string;
        status: string;
        driver?: {
            name: string;
        };
    }>;
    [key: string]: unknown;
}

export default function UserDashboard({ available_drivers, recent_bookings }: Props) {
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
            <Head title="Dashboard Pengguna" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        🏠 Dashboard Pengguna
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Selamat datang! Kelola pemesanan mobil kantor Anda di sini.
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-500 rounded-full">
                                <div className="text-white text-xl">🚗</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Driver Tersedia
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {available_drivers}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-500 rounded-full">
                                <div className="text-white text-xl">📋</div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Pemesanan
                                </p>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {recent_bookings.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6 dark:bg-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        ⚡ Aksi Cepat
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            href={route('bookings.create')}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <span className="mr-2">➕</span>
                            Buat Pemesanan Baru
                        </Link>
                        <Link
                            href={route('bookings.index')}
                            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            <span className="mr-2">📄</span>
                            Lihat Semua Pemesanan
                        </Link>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            📋 Pemesanan Terkini
                        </h2>
                        
                        {recent_bookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                Tanggal
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
                                        {recent_bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {new Date(booking.booking_date).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {booking.destination}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {booking.purpose.substring(0, 50)}...
                                                    </div>
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
                                <div className="text-4xl mb-4">📋</div>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">
                                    Belum ada pemesanan
                                </p>
                                <Link
                                    href={route('bookings.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Buat Pemesanan Pertama
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </AppLayout>
    );
}