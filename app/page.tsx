'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      
      {/* Text Section (Kiri) */}
      <section className="flex flex-col justify-center items-start p-10 lg:w-1/2 bg-[#fff5e6]">
        <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">Procurement Departement</p>
        <h1 className="text-4xl font-bold text-orange-600 mb-4">e-Procurement Catalogue</h1>
        <p className="text-gray-700 mb-8">Semua contoh dari barang permintaan model sendiri telah kami rangkum dalam katalog di situs ini.</p>
        <Link
          href="/user/catalogue"
          className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
        >
          <button type="button">Lihat Katalog</button>
        </Link>
      </section>

      {/* Image Section (Kanan) */}
      <div class="content-wrapper">
        <div class="image">
          <img
        src="/landing.jpg" 
          alt="Team"
          className="w-full h-full object-cover"
        />
        </div>
    </main>
  );
}
