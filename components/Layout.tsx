'use client';
import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="bg-orange-500 text-white p-4 shadow-md">
        <div className="flex justify-center gap-8">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/admin/upload" className="hover:underline">Upload</Link>
          <Link href="/admin/catalogue" className="hover:underline">Admin Catalogue</Link>
          <Link href="/user/catalogue" className="hover:underline">User Catalogue</Link>
          <Link href="/auth/login" className="hover:underline">Login</Link>
        </div>
      </nav>
      <div className="p-6">{children}</div>
    </div>
  );
}
