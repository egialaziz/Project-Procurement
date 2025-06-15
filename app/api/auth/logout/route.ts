import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = cookies();   // <-- Tambahan ini
  cookieStore.delete('sb-access-token');
  return NextResponse.json({ success: true });
}
