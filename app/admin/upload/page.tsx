'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(worksheet);

    for (const item of json) {
      await supabase.from('catalogue').insert(item);
    }

    alert('Upload success!');
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Upload Excel</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} className="mt-4 p-2 bg-blue-600 text-white rounded">
        Upload
      </button>
    </Layout>
  );
}

