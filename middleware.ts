// middleware.ts

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ⛔ Proteksi sementara DINONAKTIFKAN
export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const token = request.cookies.get('sb-access-token')?.value;

  // if (pathname.startsWith('/admin') && !token) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/auth/login';
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next(); // ⬅️ Semua akses diizinkan
}

export const config = {
  matcher: ['/admin/:path*'], // Masih bisa disesuaikan jika nanti ingin diaktifkan kembali
};
