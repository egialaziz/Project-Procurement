'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 p-4">
      <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center relative overflow-hidden">
        
        {/* Background Image Behind Title */}
        <img
          src="https://kcdhimdqvxsrkmugecmd.supabase.co/storage/v1/object/public/images/Pic/P_20250612_084221.jpg"
          alt="Background"
          className="absolute top-0 left-1/2 transform -translate-x-1/2 opacity-10 w-40 h-40 object-contain pointer-events-none"
          style={{ zIndex: 0 }}
        />

        {/* Title and Content */}
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-4 text-orange-600">Procurement Catalogue</h1>
          <p className="mb-8 text-gray-600">Please navigate to Admin or User pages to continue.</p>

          <div className="flex flex-col gap-4">
            <Link
              href="/auth/login"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-md"
            >
              Admin Login
            </Link>
            <Link
              href="/user/catalogue"
              className="bg-white border-2 border-orange-500 text-orange-500 font-semibold py-3 px-6 rounded-lg transition duration-300 hover:bg-orange-100"
            >
              User Catalogue View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
