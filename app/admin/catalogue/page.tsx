'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function AdminCatalogue() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement').select('*');
      setData(data || []);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Catalogue View</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {data[0] && Object.keys(data[0]).map((key) => (
              <th className="border px-4 py-2" key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {Object.values(row).map((val, i) => (
                <td className="border px-4 py-2" key={i}>{val as any}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
