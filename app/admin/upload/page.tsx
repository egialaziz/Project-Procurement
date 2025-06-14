'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(worksheet);

    const { error } = await supabase.from('procurement').insert(json);
    if (error) setMessage('Error uploading data: ' + error.message);
    else setMessage('Data uploaded successfully!');
  };

  return (
    <Layout>
      <h1 className="text-2xl mb-4 font-bold">Upload Excel</h1>
      <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} className="mb-4" />
      <button onClick={handleFileUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>
      {message && <p className="mt-4">{message}</p>}
    </Layout>
  );
}
