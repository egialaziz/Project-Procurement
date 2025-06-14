'use client';

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { supabase } from '@/lib/supabaseClient';

export default function AdminCataloguePage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('catalogue').select('*');
      setItems(data || []);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Catalogue View</h1>
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
