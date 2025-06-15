import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { access_token } = await request.json();

  if (!access_token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }

  cookies().set('sb-access-token', access_token, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });

  return NextResponse.json({ success: true });
}
