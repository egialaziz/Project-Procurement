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

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) setError(error.message);
    else router.push('/admin/catalogue');

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
      <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-orange-600 text-center">Admin Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input type="email" placeholder="Email" className="mb-4 p-3 border w-full rounded" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="mb-4 p-3 border w-full rounded" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded shadow-md" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
