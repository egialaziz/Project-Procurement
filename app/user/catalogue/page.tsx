'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function UserCatalogue() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data ?? []);
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Catalogue');
    XLSX.writeFile(workbook, 'procurement_catalogue.xlsx');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Catalogue View</h1>
      <button onClick={exportToExcel} className="mb-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded shadow-md">
        Export to Excel
      </button>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-orange-300 shadow-md rounded">
          <thead className="bg-orange-500 text-white">
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="px-4 py-2 border">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
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
