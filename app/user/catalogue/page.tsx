'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import * as XLSX from 'xlsx';
import Image from 'next/image'; // If using Next.js

export default function UserCatalogue() {
  const [data, setData] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.from('procurement_catalogue').select('*');
        if (error) throw error;
        setData(data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter((row) => {
    const rowValues = Object.values(row).join(' ').toLowerCase();
    return rowValues.includes(search.toLowerCase());
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    XLSX.writeFile(workbook, 'procurement.xlsx');
  };

  // Optimize image URL (example for Supabase Storage)
  const getOptimizedImage = (url: string) => {
    if (!url) return url;
    // Example for Supabase Storage optimization
    if (url.includes('supabase.co/storage/v1')) {
      return `${url}?width=100&quality=80`;
    }
    return url;
  };

  return (
    <div className="p-4 md:p-8 bg-orange-50 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-orange-700">User Catalogue View</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-orange-400 rounded px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={exportToExcel}
          className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Export to Excel'}
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg bg-white max-w-full">
          <table className="min-w-full border-collapse">
            <thead className="bg-orange-200">
              <tr>
                {filteredData[0] && Object.keys(filteredData[0]).map((key) => (
                  <th key={key} className="border border-orange-300 px-4 py-2 text-left">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-orange-50 even:bg-orange-100/10">
                    {Object.entries(row).map(([key, val], i) => (
                      <td key={i} className="border border-orange-300 px-4 py-2">
                        {key === 'photo' && val ? (
                          <div className="flex justify-center">
                            <img 
                              src={getOptimizedImage(val as string)} 
                              alt="Photo" 
                              className="w-16 h-16 md:w-20 md:h-20 object-cover rounded hover:scale-110 transition-transform cursor-pointer"
                              loading="lazy"
                              onClick={() => window.open(val as string, '_blank')}
                            />
                          </div>
                        ) : (
                          <span className="text-center block">
                            {typeof val === 'string' ? val : JSON.stringify(val)}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={filteredData[0] ? Object.keys(filteredData[0]).length : 1} className="text-center py-8">
                    {data.length === 0 ? 'No data available' : 'No matching records found'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
