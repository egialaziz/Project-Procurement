import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { access_token, refresh_token } = await req.json();

  const cookieStore = await cookies();  // ⬅ pakai await disini

  cookieStore.set('sb-access-token', access_token, {
    httpOnly: true,
    secure: true,
    path: '/',
  });

  cookieStore.set('sb-refresh-token', refresh_token, {
    httpOnly: true,
    secure: true,
    path: '/',
  });

  return NextResponse.json({ success: true });
}
