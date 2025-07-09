'use client';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-white">
      {/* ✅ Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-10">
        <div className="text-lg font-extrabold text-orange-600 tracking-wide drop-shadow-sm">Procurement</div>
        <div className="flex gap-4 ml-auto">
          <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/auth/login" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
            Admin Login
          </Link>
        </div>
      </nav>

      {/* ✅ Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row animate-fade-in">
        {/* Kiri */}
        <section className="flex flex-col justify-center items-start p-10 lg:w-1/2 bg-[#fff5e6]">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-widest">Procurement Department</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-4 drop-shadow-lg animate-slide-down">
            e-Procurement Catalogue
          </h1>
          <p className="text-gray-700 mb-8 max-w-md animate-fade-in">
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
        </section>

        {/* Kanan */}
        <section className="lg:w-1/2 h-[300px] lg:h-auto flex items-center justify-center bg-white animate-fade-in">
          <img
            src="/landing.jpg"
            alt="Hero procurement illustration"
            className="w-full h-full object-cover rounded-xl shadow-xl border-2 border-orange-100 animate-zoom-in"
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-white text-center text-gray-400 text-sm border-t mt-8 animate-fade-in">
        &copy; {new Date().getFullYear()} Procurement Catalogue &mdash; All rights reserved.
      </footer>
    </div>
  );
}
