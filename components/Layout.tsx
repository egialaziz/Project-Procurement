<<<<<<< HEAD
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  )
}

export default Layout
=======
'use client';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-blue-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Procurement Catalogue</h1>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/upload">Upload</Link>
          <Link href="/admin/catalogue">Admin Catalogue</Link>
          <Link href="/user/catalogue">User Catalogue</Link>
        </nav>
      </div>
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}
>>>>>>> 52a6a1d (Initial commit)
