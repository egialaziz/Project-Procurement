'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      
      {/* Text Section (Kiri) */}
      <section className="flex flex-col justify-center items-start p-10 lg:w-1/2 bg-[#fff5e6]">
        <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">New Inventory</p>
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Procurement Catalogue</h1>
        <p className="text-gray-700 mb-8">All procurement items listed clearly for user access.</p>
        <Link
          href="/user/catalogue"
          className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition"
        >
          VIEW IT NOW
        </Link>
      </section>

      {/* Image Section (Kanan) */}
      <section className="lg:w-1/2 h-[300px] lg:h-auto">
        <img
          src="/landing.jpg" // 🔁 Ganti sesuai nama file kamu di /public
          alt="Team"
          className="w-full h-full object-cover"
        />
      </section>
    </main>
  );
}
