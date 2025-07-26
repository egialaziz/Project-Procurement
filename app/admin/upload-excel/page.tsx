'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function UploadExcel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const cleanedData = jsonData.map((row) => {
        const hargaStr: string = row['HARGA_MINIMUM']?.toString() || '';
        const harga = parseInt(hargaStr.split(' ')[0].replace(/\D/g, ''), 10);

        return {
          no: parseInt(row['NO']) || null,
          spesifikasi: row['SPESIFIKASI'] || null,
          minimum_pemesanan: row['MINIMUM_PEMESANAN'] || null,
          harga_minimum: harga || null,
          po_terbit: row['PO_TERBIT'] || null,
          vendor: row['VENDOR'] || null,
          jenis: row['JENIS'] || null,
        };
      });

      const { error } = await supabase.from('procurement_catalogue').insert(cleanedData);
      if (error) {
        console.error(error);
        setMessage('Upload failed: ' + error.message);
      } else {
        setMessage('✅ Upload success!');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-600">Upload Excel ke Supabase</h1>
        <button
          onClick={() => router.push('/admin/catalogue')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-medium px-4 py-2 rounded shadow"
        >
          ← Kembali ke Catalogue
        </button>
      </div>

      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        disabled={loading}
        className="mb-4"
      />

      {loading && <p className="text-orange-600">⏳ Uploading...</p>}
      {message && <p className="text-orange-700 font-medium">{message}</p>}
    </div>
  );
}
