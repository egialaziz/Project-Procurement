'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function UploadPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setMessage('');

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      for (const item of jsonData) {
        await supabase.from('procurement_catalogue').insert([item]);
      }

      setMessage('Upload success!');
    } catch (err) {
      console.error(err);
      setMessage('Error during upload.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold text-orange-600 mb-4 text-center">Upload Procurement Catalogue</h1>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFile}
        className="block w-full mb-4"
      />
      {loading && <p className="text-blue-600 text-center">Uploading...</p>}
      {message && <p className="text-center text-green-600">{message}</p>}
    </div>
  );
}
