'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';
import Layout from '@/components/Layout';

export default function UploadPage() {
  const [message, setMessage] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet);

    const { error } = await supabase.from('procurement_catalogue').insert(json);
    if (error) setMessage('Error: ' + error.message);
    else setMessage('Upload successful!');
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-6">Upload Procurement Excel</h1>
        <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFile}
          className="mb-4 block mx-auto" />
        {message && <p className="mt-4 font-semibold">{message}</p>}
      </div>
    </Layout>
  );
}
