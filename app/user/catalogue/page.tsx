'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function UserCataloguePage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('catalogue').select('*');
      setItems(data || []);
    };
    fetchData();
  }, []);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(items);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Catalogue');
    XLSX.writeFile(workbook, 'catalogue.xlsx');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">User Catalogue View</h1>
      <button onClick={exportToExcel} className="mb-4 bg-green-600 text-white px-4 py-2 rounded">Export to Excel</button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td className="py-2">{item.id}</td>
              <td className="py-2">{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
