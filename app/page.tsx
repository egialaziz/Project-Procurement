'use client';
import Link from 'next/link';
import HeroButton from '@/components/HeroButton';

export default function HomePage() {
  return (
    <main
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/landing-new.png)" }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Selamat Datang di Sistem Procurement
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-200 max-w-2xl">
          Kelola dan akses katalog pengadaan barang dengan mudah, cepat, dan terpercaya.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <HeroButton
            href="/user/catalogue"
            label="Lihat Katalog"
            icon={<span>🛒</span>}
            variant="solid"
          />
          <HeroButton
            href="/auth/login"
            label="Masuk sebagai Admin"
            icon={<span>➜</span>}
            variant="outline"
          />
        </div>

        <div className="mt-16">
          <span className="text-white animate-bounce text-2xl">⌄</span>
        </div>
      </div>
    </main>
  );
}
