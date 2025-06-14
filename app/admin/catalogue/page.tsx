'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Layout from '@/components/Layout';

export default function AdminCataloguePage() {
  const [catalogue, setCatalogue] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('catalogue').select('*');
      if (data) setCatalogue(data);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Catalogue View</h1>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            {catalogue[0] && Object.keys(catalogue[0]).map((key) => (
              <th key={key} className="border px-4 py-2">{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {catalogue.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, idx) => (
                <td key={idx} className="border px-4 py-2">{value as string}</td>
              ))}

import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';
import { useState, useEffect } from 'react';
import * as FileSaver from 'file-saver';
import Layout from '@/components/Layout';

export default function AdminCataloguePage() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase.from('catalogue').select('*');
    if (error) alert(error.message);
    else setData(data);
  };

  const handleExport = () => {
    const exportData = data.map(({ id, gambar_url, created_at, ...rest }) => rest);
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Catalogue');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(dataBlob, 'catalogue_export.xlsx');
  };

  const filteredData = data.filter(item =>
    item.nama_barang.toLowerCase().includes(search.toLowerCase()) ||
    item.kode_barang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Admin Catalogue</h1>
      <div className="flex mb-6">
        <input type="text" placeholder="Cari barang..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 w-full mr-2" />
        <button onClick={handleExport} className="bg-green-600 text-white px-4 py-2 rounded">Export Excel</button>
      </div>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Kode</th>
            <th className="border p-2">Nama</th>
            <th className="border p-2">Kategori</th>
            <th className="border p-2">Harga</th>
            <th className="border p-2">Stok</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td className="border p-2">{item.kode_barang}</td>
              <td className="border p-2">{item.nama_barang}</td>
              <td className="border p-2">{item.kategori}</td>
              <td className="border p-2">{item.harga}</td>
              <td className="border p-2">{item.stok}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
