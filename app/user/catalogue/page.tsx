'use client';

import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

export default function UserCataloguePage() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('catalogue').select('*');
    if (error) alert(error.message);
    else setData(data);
  };

  const filteredData = data.filter(item =>
    item.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
    item.kode_barang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">User Catalogue</h1>
      <div className="mb-6">
        <input type="text" placeholder="Cari barang..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 w-full" />
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Kode</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Stok</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td className="border p-2">{item.kode_barang}</td>
              <td className="border p-2">{item.nama_barang}</td>
              <td className="border p-2">{item.kategori}</td>
              <td className="border p-2">{item.harga}</td>
              <td className="border p-2">{item.stok}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}