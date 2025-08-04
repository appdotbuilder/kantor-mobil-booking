import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Sistem Pemesanan Mobil Kantor">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-white">
                <header className="mb-6 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="text-3xl">🚗</div>
                            <h1 className="text-xl font-bold">CarBook</h1>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="flex w-full max-w-6xl items-center justify-center">
                    <main className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Hero Section */}
                        <div className="flex flex-col justify-center space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl font-bold leading-tight lg:text-5xl">
                                    🚗 Sistem Pemesanan 
                                    <span className="text-blue-600"> Mobil Kantor</span>
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300">
                                    Platform terpadu untuk mengelola pemesanan kendaraan kantor dengan sistem ticketing yang efisien
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                                    <div className="mb-3 text-2xl">👤</div>
                                    <h3 className="mb-2 font-semibold">Untuk Pengguna</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Buat pemesanan driver dengan mudah dan pantau status persetujuan
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                                    <div className="mb-3 text-2xl">🚙</div>
                                    <h3 className="mb-2 font-semibold">Untuk Driver</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Kelola perjalanan dan lacak kilometer dengan sistem yang terintegrasi
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                                    <div className="mb-3 text-2xl">⚙️</div>
                                    <h3 className="mb-2 font-semibold">Untuk Admin</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Setujui pemesanan, kelola pengguna, dan atur antrean driver
                                    </p>
                                </div>
                                <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                                    <div className="mb-3 text-2xl">📊</div>
                                    <h3 className="mb-2 font-semibold">Laporan Real-time</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Pantau status driver dan statistik pemesanan secara real-time
                                    </p>
                                </div>
                            </div>

                            {!auth.user && (
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
                                    >
                                        🚀 Mulai Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                                    >
                                        Sudah Punya Akun?
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Visual Section */}
                        <div className="flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-2xl"></div>
                                <div className="relative rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
                                    <div className="space-y-6">
                                        <div className="text-center">
                                            <div className="text-6xl mb-4">🎯</div>
                                            <h3 className="text-2xl font-bold mb-2">Fitur Utama</h3>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg dark:bg-green-900/20">
                                                <div className="text-green-600 text-xl">✅</div>
                                                <span className="font-medium">Sistem persetujuan otomatis</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                                                <div className="text-blue-600 text-xl">📱</div>
                                                <span className="font-medium">Dashboard real-time</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg dark:bg-purple-900/20">
                                                <div className="text-purple-600 text-xl">📋</div>
                                                <span className="font-medium">Manajemen antrean driver</span>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg dark:bg-orange-900/20">
                                                <div className="text-orange-600 text-xl">📊</div>
                                                <span className="font-medium">Pelacakan kilometer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400">
                    <p>
                        Sistem Pemesanan Mobil Kantor • Dibuat dengan ❤️ menggunakan Laravel & React
                    </p>
                </footer>
            </div>
        </>
    );
}