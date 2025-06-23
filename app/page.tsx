'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* ✅ Background Layer */}
      <div className="fixed inset-0 -z-50">
        {/* Background Image dengan opacity */}
        <img
          src="/P_20250612_084221.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-50"
        />
        
        {/* Dark Overlay untuk meningkatkan keterbacaan teks */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* ✅ Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-8 max-w-md w-full text-center">
          <h1 className="text-4xl font-bold mb-6 text-orange-600">Procurement Catalogue</h1>
          <p className="mb-8 text-gray-700 text-lg">
            Please navigate to Admin or User pages to continue.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              href="/auth/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Admin Login
            </Link>
            <Link
              href="/user/catalogue"
              className="bg-white border-2 border-orange-500 text-orange-500 font-semibold py-3 px-6 rounded-lg transition duration-300 hover:bg-orange-50 hover:border-orange-600"
            >
              User Catalogue View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
