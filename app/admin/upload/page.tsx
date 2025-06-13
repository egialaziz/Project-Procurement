'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import * as XLSX from 'xlsx';
import { supabase } from '@/lib/supabaseClient';

export default function UploadPage() {
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setExcelFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!excelFile) return;

    const data = await excelFile.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet);

    const { error } = await supabase.from('catalogue').insert(jsonData);

    if (error) alert(error.message);
    else alert('Data uploaded successfully');
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Upload Excel</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>
    </Layout>
  );
}