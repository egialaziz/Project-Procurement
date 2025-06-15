import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();  // pakai await di Next.js 15
  cookieStore.delete('sb-access-token');
  cookieStore.delete('sb-refresh-token');
  return NextResponse.json({ success: true });
}
