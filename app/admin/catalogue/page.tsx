'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function AdminCataloguePage() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data || []);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Catalogue View</h1>
      <div className="overflow-auto border border-gray-300 rounded shadow">
        <table className="min-w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="border px-4 py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-100">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="border px-4 py-2">{val as any}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
