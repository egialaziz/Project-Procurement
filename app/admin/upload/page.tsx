'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function UploadPage() {
  const [message, setMessage] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

    const formattedData = jsonData.map(item => ({
      kode_barang: item.kode_barang,
      nama_barang: item.nama_barang,
      kategori: item.kategori,
      harga: item.harga,
      stok: item.stok,
      gambar_url: item.gambar_url
    }));

    const { error } = await supabase.from('catalogue').insert(formattedData);

    if (error) {
      console.error(error);
      setMessage("Error uploading data: " + error.message);
    } else {
      setMessage("Upload successful!");
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Upload Catalogue</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </Layout>
  );
}
