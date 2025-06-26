'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';

export default function UserCatalogue() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch data once on mount
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('procurement_catalogue').select('*');
      setData(data || []);
    };
    fetchData();
  }, []);

  // Filtered by search
  const filteredData = data.filter((row) => {
    const rowValues = Object.values(row).join(' ').toLowerCase();
    return rowValues.includes(search.toLowerCase());
  });

  // Toggle all checkboxes
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const allIndexes = filteredData.map((_, idx) => idx);
      setSelectedRows(allIndexes);
    }
    setSelectAll(!selectAll);
  };

  // Toggle single checkbox
  const toggleRow = (idx: number) => {
    if (selectedRows.includes(idx)) {
      setSelectedRows(selectedRows.filter((i) => i !== idx));
    } else {
      setSelectedRows([...selectedRows, idx]);
    }
  };

  // Export selected rows
  const exportToExcel = () => {
    const selectedData = selectedRows.map((i) => filteredData[i]);
    if (selectedData.length === 0) return alert("No rows selected!");
    const worksheet = XLSX.utils.json_to_sheet(selectedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selected Data');
    XLSX.writeFile(workbook, 'selected_procurement.xlsx');
  };

  return (
    <div className="p-8 bg-orange-100 min-h-screen">
      {/* 🔗 Home Navigation */}
      <div className="mb-6">
        <a
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          ⬅ Home
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">
        User Catalogue View
      </h1>

      {/* 🔍 Search & 📤 Export */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-orange-400 rounded px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={exportToExcel}
          className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Export Selected
        </button>
      </div>

      {/* 📋 Table */}
      <div className="overflow-x-auto shadow rounded bg-white">
        <table className="min-w-full border-collapse border border-orange-400">
          <thead>
            <tr>
              <th className="border border-orange-400 px-4 py-2 bg-orange-200">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              {filteredData[0] &&
                Object.keys(filteredData[0])
                  .filter((key) => key !== 'id')
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
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(idx)}
                    onChange={() => toggleRow(idx)}
                  />
                </td>
                {Object.entries(row)
                  .filter(([key]) => key !== 'id')
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
      </div>
    </div>
  );
}
