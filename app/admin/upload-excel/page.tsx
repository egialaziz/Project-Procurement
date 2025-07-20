'use client';

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';

export default function UploadExcel() {
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
        const harga = parseInt(hargaStr.split(' ')[0].replace(/\D/g, ''), 10); // ambil angka awal saja

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

      // Insert ke Supabase
      const { error } = await supabase.from('procurement_catalogue').insert(cleanedData);
      if (error) {
        console.error(error);
        setMessage('Upload failed: ' + error.message);
      } else {
        setMessage('Upload success!');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4 font-bold">Upload Excel to Supabase</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} disabled={loading} />
      {loading && <p>Uploading...</p>}
      {message && <p>{message}</p>}
    </div>
  );
}
