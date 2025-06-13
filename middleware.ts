import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function middleware(req: NextRequest) {
  const { data: { session } } = await supabase.auth.getSession();
  const url = req.nextUrl.clone();

  if (!session && url.pathname.startsWith('/admin')) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};