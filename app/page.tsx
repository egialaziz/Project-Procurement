"use client"

import Link from "next/link"
import { ShoppingCart, Users, Clock, Shield, Search, FileText, CheckCircle } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-6 h-6 text-orange-600" />
          <span className="text-xl font-bold text-orange-600">e-Procurement</span>
        </div>
        <div className="flex gap-6 ml-auto">
          <Link href="/" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
            Home
          </Link>
          <Link href="/user/catalogue" className="text-gray-600 hover:text-orange-600 font-medium transition-colors">
            Katalog
          </Link>
          <Link
            href="/auth/login"
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Admin Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center items-start p-10 lg:p-16 lg:w-1/2 bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Procurement Department
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              e-Procurement
              <span className="text-orange-600 block">Catalogue</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              Semua contoh dari barang permintaan model sendiri telah kami rangkum dalam katalog digital yang mudah
              diakses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/user/catalogue">
                <button className="bg-orange-600 text-white py-4 px-8 rounded-xl hover:bg-orange-700 transition-all transform hover:scale-105 font-semibold shadow-lg">
                  Lihat Katalog
                </button>
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-xl hover:border-orange-600 hover:text-orange-600 transition-all font-semibold">
                Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:w-1/2 h-[400px] lg:h-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center">
              <div className="text-center text-white">
                <ShoppingCart className="w-24 h-24 mx-auto mb-4 opacity-80" />
                <p className="text-lg font-medium opacity-90">Procurement System</p>
                <p className="text-sm opacity-70">Digital Catalogue Platform</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
                <p className="text-gray-600">Item Katalog</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600">Departemen Aktif</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">24/7</h3>
                <p className="text-gray-600">Akses Sistem</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Sistem e-procurement yang dirancang untuk memudahkan proses pengadaan barang dan jasa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Pencarian Mudah</h3>
                <p className="text-gray-600">
                  Temukan barang yang Anda butuhkan dengan sistem pencarian yang canggih dan filter yang lengkap.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Katalog Lengkap</h3>
                <p className="text-gray-600">
                  Akses katalog lengkap dengan spesifikasi detail, harga, dan informasi supplier terpercaya.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Proses Cepat</h3>
                <p className="text-gray-600">
                  Proses pengadaan yang efisien dengan sistem approval otomatis dan tracking real-time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-orange-600">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Siap Memulai Pengadaan Digital?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Bergabunglah dengan sistem e-procurement modern yang memudahkan proses pengadaan di organisasi Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/user/catalogue">
                <button className="bg-white text-orange-600 py-4 px-8 rounded-xl hover:bg-gray-100 transition-all font-semibold shadow-lg">
                  Jelajahi Katalog
                </button>
              </Link>
              <Link href="/auth/login">
                <button className="border-2 border-white text-white py-4 px-8 rounded-xl hover:bg-white hover:text-orange-600 transition-all font-semibold">
                  Login Admin
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="w-6 h-6 text-orange-600" />
                <span className="text-xl font-bold">e-Procurement</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Sistem pengadaan digital yang memudahkan proses procurement dengan katalog lengkap dan fitur modern.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/user/catalogue" className="hover:text-white transition-colors">
                    Katalog
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-white transition-colors">
                    Admin Login
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: procurement@company.com</li>
                <li>Phone: (021) 123-4567</li>
                <li>Support: 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 e-Procurement System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
