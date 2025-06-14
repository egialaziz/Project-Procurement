'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Procurement Catalogue</h1>
      <p className="mb-8">Please navigate to one of the pages below:</p>

      <div className="space-y-4">
        <button
          onClick={() => router.push('/admin/catalogue')}
          className="px-6 py-3 bg-blue-600 text-white rounded shadow"
        >
          Go to Admin Catalogue
        </button>

        <button
          onClick={() => router.push('/user/catalogue')}
          className="px-6 py-3 bg-green-600 text-white rounded shadow"
        >
          Go to User Catalogue
        </button>

        <button
          onClick={() => router.push('/auth/login')}
          className="px-6 py-3 bg-gray-800 text-white rounded shadow"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
