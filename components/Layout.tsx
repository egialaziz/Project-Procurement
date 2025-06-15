'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  return (
    <div>
      <nav className="bg-orange-600 text-white p-4 flex justify-between">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/admin/upload">Upload</Link>
          <Link href="/admin/catalogue">Admin Catalogue</Link>
          <Link href="/user/catalogue">User Catalogue</Link>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-1 rounded">Logout</button>
      </nav>
      <div className="p-4">{children}</div>
    </div>
  );
}
