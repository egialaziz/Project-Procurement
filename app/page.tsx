'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ✅ Navigation Bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <div className="text-lg font-semibold text-orange-600">Procurement</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">
            Home
          </Link>
          <Link href="/auth/login" className="text-gray-600 hover:text-orange-600 font-medium">
            Admin Login
          </Link>
          <Link href="/admin/catalogue" className="text-gray-600 hover:text-orange-600 font-medium">
            Admin Catalogue
          </Link>
        </div>
      </nav>

      {/* ✅ Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Kiri */}
        <section className="flex flex-col justify-center items-start p-10 lg:w-1/2 bg-[#fff5e6]">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Procurement Departement</p>
          <h1 className="text-4xl font-bold text-orange-600 mb-4">e-Procurement Catalogue</h1>
          <p className="text-gray-700 mb-8">
            Semua contoh dari barang permintaan model sendiri telah kami rangkum dalam katalog di situs ini.
          </p>
          <Link href="/user/catalogue">
            <button
              type="button"
              className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
            >
              Lihat Katalog
            </button>
          </Link>
        </section>

        {/* Kanan */}
        <section className="lg:w-1/2 h-[300px] lg:h-auto">
          <img
           // src="/landing.jpg" // Ganti dengan nama file gambar kamu di public/
            alt="Landing"
            className="w-full h-full object-cover"
          />
        </section>
      </main>
    </div>
  );
}
