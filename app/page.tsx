'use client';
import Link from 'next/link';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gray-800 flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
         //src="/landing.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Selamat Datang di Sistem <br /> <span className="text-white">Procurement</span>
        </h1>
        <p className="text-gray-200 text-lg mb-8 max-w-xl mx-auto">
          Kelola dan akses katalog pengadaan barang dengan mudah, cepat, dan terpercaya.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center mb-12">
          <Link href="/user/catalogue">
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full shadow transition-all duration-200">
              <FaShoppingCart /> Lihat Katalog
            </button>
          </Link>
          <Link href="/auth/login">
            <button className="flex items-center gap-2 border border-white text-white py-3 px-6 rounded-full hover:bg-white hover:text-gray-900 transition-all duration-200">
              <FaSignInAlt /> Masuk sebagai Admin
            </button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center mx-auto animate-bounce">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
