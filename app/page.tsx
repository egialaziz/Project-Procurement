'use client';
import Link from 'next/link';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
      {/* ✅ Background Image */}
      <div className="absolute inset-0 -z-10">
  <img
    src="/landing_1.jpg"
    alt="Background"
    className="w-full h-full object-cover opacity-70 blur-sm scale-105"
  />
  <div className="absolute inset-0 bg-black/60" />
</div>


      {/* ✅ Main Content */}
      <div className="text-center px-6 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-xl">
          Selamat Datang di Sistem <br /> <span className="text-white">Procurement</span>
        </h1>
        <p className="text-gray-200 text-lg mb-10 drop-shadow-sm">
          Kelola dan akses katalog pengadaan barang dengan mudah, cepat, dan terpercaya.
        </p>

        {/* ✅ Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12">
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

        {/* ✅ Scroll Indicator */}
        <div className="mt-8">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-center justify-center mx-auto animate-bounce">
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
