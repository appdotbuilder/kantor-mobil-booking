import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';

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
    start_km?: number;
    end_km?: number;
    user: User;
    driver?: User;
}

interface PaginatedBookings {
    data: Booking[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
}

interface Props {
    bookings: PaginatedBookings;
    [key: string]: unknown;
}

export default function BookingsIndex({ bookings }: Props) {
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

    const getTotalKm = (booking: Booking) => {
        if (booking.start_km && booking.end_km) {
            return booking.end_km - booking.start_km;
        }
        return null;
    };

    return (
        <AppLayout>
            <Head title="Daftar Pemesanan" />
            
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            📄 Daftar Pemesanan
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Kelola dan pantau semua pemesanan mobil kantor.
                        </p>
                    </div>
                    <Link
                        href={route('bookings.create')}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        ➕ Buat Pemesanan
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow dark:bg-gray-800">
                    <div className="p-6">
                        {bookings.data.length > 0 ? (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-700">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                    Tanggal
                                                </th>
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
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                    KM
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                                    Aksi
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                            {bookings.data.map((booking) => (
                                                <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {new Date(booking.booking_date).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {booking.user.name}
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
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                        {getTotalKm(booking) ? `${getTotalKm(booking)} km` : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <Link
                                                            href={route('bookings.show', booking.id)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                        >
                                                            👁️ Lihat
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                {bookings.last_page > 1 && (
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="text-sm text-gray-700 dark:text-gray-300">
                                            Menampilkan {bookings.from} - {bookings.to} dari {bookings.total} pemesanan
                                        </div>
                                        <div className="flex space-x-2">
                                            {bookings.current_page > 1 && (
                                                <Button
                                                    onClick={() => router.get(route('bookings.index', { page: bookings.current_page - 1 }))}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    ← Sebelumnya
                                                </Button>
                                            )}
                                            {bookings.current_page < bookings.last_page && (
                                                <Button
                                                    onClick={() => router.get(route('bookings.index', { page: bookings.current_page + 1 }))}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    Selanjutnya →
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    Belum ada pemesanan
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">
                                    Buat pemesanan pertama Anda untuk memulai.
                                </p>
                                <Link
                                    href={route('bookings.create')}
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    ➕ Buat Pemesanan Pertama
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