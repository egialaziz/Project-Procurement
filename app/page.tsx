'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen isolate">
      {/* Background Layer (PASTIKAN z-index lebih rendah) */}
      <div className="absolute inset-0 -z-[1]"> {/* Gunakan -z-[1] atau -z-10 */}
        <img
          src="/P_20250612_084221.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-70"
        />
        {/* Overlay Gelap untuk kontras */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content Layer (PASTIKAN z-index default/lebih tinggi) */}
      <div className="relative z-0 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 max-w-md w-full text-center border border-orange-100">
          <h1 className="text-4xl font-bold mb-6 text-orange-600">Procurement Catalogue</h1>
          <p className="mb-8 text-gray-700">
            Please navigate to Admin or User pages to continue.
          </p>
          
          <div className="flex flex-col gap-4">
            <Link
              href="/auth/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Admin Login
            </Link>
            <Link
              href="/user/catalogue"
              className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
            >
              User Catalogue View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
