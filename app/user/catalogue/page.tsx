'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function UserCatalogue() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data || []);
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'procurement.xlsx');
  };

  return (
    <div className="p-8 bg-orange-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">User Catalogue View</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToExcel}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full border-collapse border border-orange-400">
          <thead>
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="border border-orange-400 px-4 py-2 bg-orange-200">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
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
