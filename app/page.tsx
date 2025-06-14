import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-3xl font-bold mb-8">Procurement Catalogue</h1>
      <p className="mb-8">Please navigate to admin or user pages to continue.</p>
      <div className="flex gap-4">
        <Link href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded">Admin Login</Link>
        <Link href="/user/catalogue" className="bg-green-600 text-white px-4 py-2 rounded">User View</Link>
      </div>
    </div>
  );
}
