'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row items-center justify-center">
      
      {/* Text Section */}
      <div className="w-full lg:w-1/2 px-8 py-20 text-center lg:text-left">
        <p className="text-sm uppercase tracking-wide text-gray-600 mb-2">New Inventory</p>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Procurement Catalogue</h1>
        <p className="text-lg text-gray-600 mb-8">All procurement items listed clearly for user access.</p>
        
        <Link
          href="/user/catalogue"
          className="inline-block bg-black text-white text-sm font-semibold px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          VIEW IT NOW
        </Link>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src="/your-placeholder.jpg" // Ganti nanti dengan gambar kamu
          alt="Procurement Visual"
          className="w-full h-[500px] object-cover"
        />
      </div>

    </div>
  );
}
