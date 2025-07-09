'use client';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-orange-50 overflow-hidden">
      {/* ✅ Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/landing.jpg"
          alt="Background Hero"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* ✅ Overlay Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex items-center justify-between px-6 py-4 bg-white/80 shadow-md backdrop-blur-md">
          <div className="text-lg font-extrabold text-orange-600 tracking-wide">Procurement</div>
          <div className="flex gap-4 ml-auto">
            <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/auth/login" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
              Admin Login
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-start justify-center px-10 py-16 max-w-3xl mx-auto text-white text-left">
          <p className="text-sm text-orange-100 mb-2 uppercase tracking-widest">
            Procurement Department
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg animate-slide-down">
            e-Procurement Catalogue
          </h1>
          <p className="text-white/90 mb-8 max-w-md animate-fade-in drop-shadow">
            Temukan berbagai contoh barang permintaan yang telah kami rangkum dalam katalog digital ini.
            Mudahkan proses pengadaan dengan referensi yang lengkap dan up-to-date!
          </p>
          <Link href="/user/catalogue">
            <button
              type="button"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-7 rounded-full shadow-lg hover:scale-105 hover:from-orange-600 hover:to-orange-700 transition-all duration-200 font-semibold text-lg animate-bounce-slow"
            >
              Lihat Katalog <FaArrowRight className="ml-1" />
            </button>
          </Link>
        </main>

        {/* Footer */}
        <footer className="w-full py-4 bg-white/80 text-center text-gray-600 text-sm border-t backdrop-blur-md">
          &copy; {new Date().getFullYear()} Procurement Catalogue &mdash; All rights reserved.
        </footer>
      </div>
    </div>
  );
}
