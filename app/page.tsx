'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/landing.jpg)' }}>
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Selamat Datang di Sistem Procurement
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl">
          Kelola dan akses katalog pengadaan barang dengan mudah dan cepat.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="/user/catalogue"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-orange-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h3.6a1 1 0 01.95.684L9.4 5H20a1 1 0 011 1v2a1 1 0 01-1 1h-1l-1.2 6H7.6l-.45-2H4a1 1 0 01-1-1V5z" />
            </svg>
            Lihat Katalog
          </a>

          <a
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-orange-600 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l4-4m-4 4l4 4m13-9v6a2 2 0 01-2 2H9m4-4h8" />
            </svg>
            Masuk sebagai Admin
          </a>
        </div>
      </div>
    </main>
  );
}
