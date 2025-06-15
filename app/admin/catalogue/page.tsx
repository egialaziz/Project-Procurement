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

  const filteredData = data.filter((row) =>
    Object.values(row).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-8 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">
        Admin Catalogue Management
      </h1>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-orange-400 rounded w-full max-w-md"
        />
      </div>

      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full border-collapse border border-orange-400">
          <thead className="bg-orange-500 text-white">
            <tr>
              {filteredData[0] && Object.keys(filteredData[0]).map((key) => (
                <th key={key} className="border border-orange-400 px-4 py-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className="hover:bg-orange-50">
                {Object.values(row).map((val, i) => (
                  <td key={i} className="border border-orange-400 px-4 py-2">{val as any}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
