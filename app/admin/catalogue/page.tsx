'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function AdminCatalogue() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);

  const [newItem, setNewItem] = useState<any>({
    no: '',
    photo: '',
    spesifikasi: '',
    minimum_pemesanan: '',
    harga_minimum: '',
    po_terbit: '',
    vendor: '',
    jenis: '',
  });

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredData = data.filter((row) =>
    Object.values(row).join(' ').toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAll = () => {
    setSelectedRows(selectAll ? [] : filteredData.map((_, idx) => idx));
    setSelectAll(!selectAll);
  };

  const toggleRow = (idx: number) => {
    setSelectedRows((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const exportToExcel = () => {
    const selectedData = selectedRows.map((i) => filteredData[i]);
    if (selectedData.length === 0) return alert('No rows selected!');
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Data');
    XLSX.writeFile(workbook, 'admin_selected_procurement.xlsx');
  };

  const handleAddItem = async () => {
    if (!newItem.no || !newItem.spesifikasi || !newItem.harga_minimum) {
      alert('Field wajib tidak boleh kosong.');
      return;
    }

    const { error } = await supabase.from('procurement_catalogue').insert([newItem]);
    if (error) {
      alert('Gagal menambahkan item.');
      console.error(error);
    } else {
      alert('Item berhasil ditambahkan.');
      setNewItem({
        no: '',
        photo: '',
        spesifikasi: '',
        minimum_pemesanan: '',
        harga_minimum: '',
        po_terbit: '',
        vendor: '',
        jenis: '',
      });
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data || []);
    }
  };

  return (
    <div className="p-8 bg-orange-100 min-h-screen">
      {/* 🔗 Navigasi */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <h1 className="text-3xl font-bold text-orange-700">Admin Catalogue Management</h1>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-300 hover:bg-gray-400 text-black font-medium px-4 py-2 rounded shadow"
          >
            Home
          </button>
          <button
            onClick={() => router.push('/admin/upload')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded shadow"
          >
            + Tambah Manual
          </button>
          <button
            onClick={() => router.push('/admin/upload-excel')}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded shadow"
          >
            Upload Excel
          </button>
        </div>
      </div>

      {/* 📥 Form Tambah Item */}
      <div className="bg-white p-4 mb-6 rounded shadow space-y-4">
        <h2 className="text-xl font-semibold text-orange-600">Tambah Item Baru</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input type="number" placeholder="No" value={newItem.no} onChange={(e) => setNewItem({ ...newItem, no: Number(e.target.value) })} className="border border-orange-400 px-3 py-2 rounded" />
          <input type="text" placeholder="Spesifikasi" value={newItem.spesifikasi} onChange={(e) => setNewItem({ ...newItem, spesifikasi: e.target.value })} className="border border-orange-400 px-3 py-2 rounded" />
          <input type="text" placeholder="Minimum Pemesanan" value={newItem.minimum_pemesanan} onChange={(e) => setNewItem({ ...newItem, minimum_pemesanan: e.target.value })} className="border border-orange-400 px-3 py-2 rounded" />
          <input type="text" placeholder="Harga Minimum" value={newItem.harga_minimum} onChange={(e) => setNewItem({ ...newItem, harga_minimum: e.target.value })} className="border border-orange-400 px-3 py-2 rounded" />
          <input type="text" placeholder="PO Terbit" value={newItem.po_terbit} onChange={(e) => setNewItem({ ...newItem, po_terbit: e.target.value })} className="border border-orange-400 px-3 py-2 rounded" />
          <input type="text" placeholder="Vendor" value={newItem.vendor} onChange={(e) => setNewItem({ ...newItem, vendor: e.target.value })} className="border border-orange-400 px-3 py-2 rounded" />
          <input type="text" placeholder="Jenis" value={newItem.jenis} onChange={(e) => setNewItem({ ...newItem, jenis: e.target.value })} className="border border-orange-400 px-3 py-2 rounded" />
          <input type="text" placeholder="URL Foto" value={newItem.photo} onChange={(e) => setNewItem({ ...newItem, photo: e.target.value })} className="border border-orange-400 px-3 py-2 rounded" />
        </div>
        <button onClick={handleAddItem} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow">
          Simpan
        </button>
      </div>

      {/* 🔍 Search & Export */}
      <div className="flex justify-between items-center mb-6">
        <input type="text" placeholder="Search..." className="border border-orange-400 rounded px-4 py-2 w-full max-w-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button onClick={exportToExcel} className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow">
          Export Selected
        </button>
      </div>

      {/* 📊 Tabel */}
      <div className="overflow-x-auto shadow rounded bg-white">
        {loading ? (
          <p className="text-center py-6 text-orange-600 font-semibold">Loading data...</p>
        ) : (
          <table className="min-w-full border-collapse border border-orange-400">
            <thead>
              <tr>
                <th className="border border-orange-400 px-4 py-2 bg-orange-200">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                {filteredData[0] &&
                  Object.keys(filteredData[0])
                    .filter((key) => key !== 'id' && key !== 'created_at')
                    .map((key) => (
                      <th key={key} className="border border-orange-400 px-4 py-2 bg-orange-200">
                        {key}
                      </th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-orange-100">
                  <td className="border border-orange-400 px-4 py-2 text-center">
                    <input type="checkbox" checked={selectedRows.includes(idx)} onChange={() => toggleRow(idx)} />
                  </td>
                  {Object.entries(row)
                    .filter(([key]) => key !== 'id' && key !== 'created_at')
                    .map(([key, val], i) => (
                      <td key={i} className="border border-orange-400 px-4 py-2 text-center">
                        {key === 'photo' && val ? (
                          <a href={val as string} target="_blank" rel="noopener noreferrer">
                            <img
                              src={(val as string).replace('/object/public/', '/render/image/public/') + '?width=100&height=100'}
                              alt="Photo"
                              className="max-w-[80px] max-h-[80px] object-contain mx-auto rounded"
                            />
                          </a>
                        ) : (
                          val as any
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
