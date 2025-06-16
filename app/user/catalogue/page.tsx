'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function UserCatalogue() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data || []);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((row) => {
    const rowValues = Object.values(row).join(' ').toLowerCase();
    return rowValues.includes(search.toLowerCase());
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'procurement.xlsx');
  };

  return (
    <div className="p-8 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">User Catalogue View</h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-orange-400 rounded px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={exportToExcel}
          className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Export to Excel
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full border-collapse border border-orange-400">
          <thead>
            <tr>
              {filteredData[0] && Object.keys(filteredData[0]).map((key) => (
                <th key={key} className="border border-orange-400 px-4 py-2 bg-orange-200">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={idx} className="hover:bg-orange-100">
                {Object.entries(row).map(([key, val], i) => (
                  <td key={i} className="border border-orange-400 px-4 py-2 text-center">
                    {key === 'photo' && val 
                      ? <img src={val as string} alt="Photo" className="w-16 h-16 object-cover rounded mx-auto" />
                      : (val as any)
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
