'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file.');
      return;
    }

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

    for (const item of jsonData) {
      await supabase.from('catalogue').insert({
        name: item.name,
        description: item.description,
        price: item.price
      });
    }

    setMessage('Upload successful!');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Upload Catalogue</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload
      </button>
      {message && <p className="mt-4">{message}</p>}
    </Layout>
  );
}
