'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';
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
    <Layout>
      <h1 className="text-2xl font-bold mb-4">User Catalogue View</h1>
      <button onClick={exportToExcel} className="mb-4 bg-green-600 text-white px-4 py-2 rounded">Export to Excel</button>
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
