'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">

      {/* ✅ Navigation Bar */}
     <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
  <div className="text-lg font-semibold text-orange-600">Procurement</div>
  <div className="flex gap-4 ml-auto">
    <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium">
      Home
    </Link>
    <Link href="/auth/login" className="text-gray-600 hover:text-orange-600 font-medium">
      Admin Login
    </Link>
  </div>
</nav>

      {/* ✅ Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row">
        {/* Kiri */}
        <section className="flex flex-col justify-center items-start p-10 lg:w-1/2 bg-[#fff5e6]">
          <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Procurement Departement</p>
          <h1 className="text-4xl font-bold text-orange-600 mb-4">e-Procurement Catalogue</h1>

        </section>

        {/* Kanan */}
        <section class="hero">
          <img
            src="/landing.jpg" 
            alt="ini harusnya foto tampan aku, tapi style .css belum mengizinkan">
            <div class="hero-text">
              <h1> Semua contoh dari barang permintaan model sendiri telah kami rangkum dalam katalog di situs ini.</h1>
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
      </main>
    </div>
  );
}
