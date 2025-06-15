'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';

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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else router.push('/admin/catalogue');
    } catch {
      setError('Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-[80vh]">
        <form onSubmit={handleLogin} className="bg-white p-10 rounded shadow-md w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input type="email" placeholder="Email" value={email}
            className="mb-4 p-3 border w-full rounded" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password}
            className="mb-4 p-3 border w-full rounded" onChange={e => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded font-semibold" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </Layout>
  );
}
