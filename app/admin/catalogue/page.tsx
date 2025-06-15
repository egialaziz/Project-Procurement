'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdminCatalogue() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data ?? []);
    };
    fetchData();
  }, []);

  const filtered = data.filter(row =>
    Object.values(row).some(val => val?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-orange-600 text-center">Admin Catalogue</h1>
      <input type="text" placeholder="Search..." className="border p-2 mb-4 w-full"
        value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full border-collapse border border-orange-300">
          <thead className="bg-orange-500 text-white">
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="px-4 py-2 border">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr key={idx} className="hover:bg-orange-50">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="border px-4 py-2">{val as any}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
