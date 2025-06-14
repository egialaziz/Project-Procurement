'use client';

import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';

interface CatalogueItem {
  id: number;
  name: string;
  description: string;
  price: number;
}

export default function UserCatalogue() {
  const [catalogue, setCatalogue] = useState<CatalogueItem[]>([]);

  useEffect(() => {
    const fetchCatalogue = async () => {
      const { data } = await supabase.from('catalogue').select('*');
      if (data) setCatalogue(data);
    };
    fetchCatalogue();
  }, []);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(catalogue);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Catalogue');
    XLSX.writeFile(wb, 'catalogue.xlsx');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">User Catalogue View</h1>
      <button
        onClick={exportToExcel}
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Export to Excel
      </button>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {catalogue.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.description}</td>
              <td className="border px-4 py-2">{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
