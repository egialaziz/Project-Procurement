'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';
import Layout from '@/components/Layout';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      const formattedData = jsonData.map((item) => ({
        no: item['NO'] || null,
        photo: item['PHOTO'] || null,
        spesifikasi: item['SPESIFIKASI'] || null,
        minimum_pemesanan: item['MINIMUM PEMESANAN'] || null,
        harga_minimum: item['HARGA MINIMUM DARI PEMESANAN'] || null,
        po_terbit: item['PO TERBIT'] || null,
        vendor: item['VENDOR'] || null,
        jenis: item['JENIS'] || null,
      }));

      const { error } = await supabase.from('procurement_catalogue').insert(formattedData);
      if (error) {
        alert('Upload failed: ' + error.message);
      } else {
        alert('Upload success!');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Upload Procurement Catalogue</h1>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="ml-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </Layout>
  );
}
