'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ✅ Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Kiri */}
        <section className="flex flex-col justify-between p-10 lg:w-1/2 bg-[#fff5e6]">
          {/* Header + Nav */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-sm text-gray-500 uppercase tracking-wide">
              Procurement Departement
            </div>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">
                Home
              </Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-orange-600 font-medium">
                Admin Login
              </Link>
            </div>
          </div>

          {/* Judul dan Isi */}
          <div>
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
          </div>
        </section>

        {/* Kanan */}
        <section className="lg:w-1/2 h-[300px] lg:h-auto">
          <img
            // src="/landing.jpg"
            alt="Landing"
            className="w-full h-full object-cover"
          />
        </section>
      </main>
    </div>
  );
}
