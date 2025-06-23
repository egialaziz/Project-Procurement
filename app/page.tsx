'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ✅ Background fixed + blur + dark overlay */}
      <div className="fixed inset-0 -z-50">
        <img
          src="/P_20250612_084221.jpg"
          alt="Background"
          className="w-20 h-20 md:w-24 md:h-24 object-contain"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      {/* ✅ Foreground content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-md w-full text-center border border-orange-100">
          <h1 className="text-4xl font-bold mb-6 text-orange-600">Procurement Catalogue</h1>
          <p className="mb-8 text-gray-700 text-lg">
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
      </main>
    </div>
  );
}
