'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import XLSX from 'xlsx';
import Layout from '@/components/Layout';

export default function UserCataloguePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('procurement_catalogue').select('*');
      if (!error) setData(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'procurement_catalogue.xlsx');
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Procurement Catalogue</h1>

        <div className="flex justify-end mb-4">
          <button 
            onClick={exportToExcel}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow"
          >
            Export to Excel
          </button>
        </div>

        {loading ? (
          <div className="text-center text-lg font-semibold">Loading...</div>
        ) : (
          <div className="overflow-auto rounded shadow border border-gray-300">
            <table className="min-w-full border-collapse">
              <thead className="bg-blue-600 text-white">
                <tr>
                  {data[0] &&
                    Object.keys(data[0]).map((key) => (
                      <th key={key} className="border px-4 py-2 text-left">
                        {key}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-100">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="border px-4 py-2 whitespace-nowrap">
                        {val as any}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
}
