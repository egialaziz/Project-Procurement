'use client';
import React from 'react';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="bg-blue-600 text-white p-4">
        <div className="flex gap-4">
          <Link href="/">Home</Link>
          <Link href="/admin/upload">Upload</Link>
          <Link href="/admin/catalogue">Admin Catalogue</Link>
          <Link href="/user/catalogue">User Catalogue</Link>
          <Link href="/auth/login">Login</Link>
        </div>
      </nav>
      <div className="p-4">{children}</div>
    </div>
  );
}
