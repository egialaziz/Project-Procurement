'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function AdminCataloguePage() {
  const [catalogue, setCatalogue] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('catalogue').select('*');
      if (data) setCatalogue(data);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Catalogue View</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {catalogue[0] && Object.keys(catalogue[0]).map((key) => (
              <th key={key} className="border px-4 py-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {catalogue.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="border px-4 py-2">{value as string}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
