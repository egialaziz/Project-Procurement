'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    for (const item of jsonData) {
      await supabase.from('procurement_catalogue').insert(item);
    }

    alert('Upload completed!');
    setUploading(false);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-orange-600">Upload Catalogue</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} className="mb-4" />
      {uploading && <p>Uploading...</p>}
    </div>
  );
}
