'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // ✅ Tambahkan ini untuk debugging
    console.log('LOGIN RESULT:', data);
    console.log('LOGIN ERROR:', error);

    if (error) {
      setError(error.message);
    } else if (data?.session) {
      router.push('/admin/catalogue');
    } else {
      setError('Login failed.');
    }
  } catch {
    setError('Unexpected error occurred.');
  } finally {
    setLoading(false);
  }
};
