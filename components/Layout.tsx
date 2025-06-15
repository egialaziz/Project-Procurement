'use client';

import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="bg-orange-600 text-white p-4 flex justify-center gap-6 shadow-md">
        <Link href="/">Home</Link>
        <Link href="/admin/upload">Upload</Link>
        <Link href="/admin/catalogue">Admin Catalogue</Link>
        <Link href="/user/catalogue">User Catalogue</Link>
        <Link href="/auth/login">Login</Link>
      </nav>
      <main className="p-6 bg-orange-50 min-h-screen">{children}</main>
    </div>
  );
}
