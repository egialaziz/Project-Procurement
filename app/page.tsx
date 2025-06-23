'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-row bg-white">
    
      {/* Left Section (Text) */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center px-10 py-20">
        <p className="text-sm text-gray-500 mb-2 uppercase tracking-wide">New Inventory</p>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Procurement Catalogue</h1>
        <p className="text-lg text-gray-600 mb-8">All procurement items listed clearly for user access.</p>

        <Link
          href="/user/catalogue"
          className="bg-black text-white text-sm font-semibold px-6 py-3 rounded-full w-max hover:bg-gray-800 transition"
        >
          VIEW IT NOW
        </Link>
      </section>

      {/* Right Section (Image) */}
      <section className="w-full lg:w-1/2">
        <img
          src="/landing.jpg" // <- ganti ini dengan nama gambar kamu
          alt="Team Photo"
          className="w-full h-[500px] lg:h-screen object-cover"
        />
      </section>
    </main>
  );
}
