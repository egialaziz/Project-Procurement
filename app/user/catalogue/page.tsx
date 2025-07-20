"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import * as XLSX from "xlsx"

export default function UserCatalogue() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [loading, setLoading] = useState(true)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase
          .from("procurement_catalogue")
          .select("*")
          .order("no", { ascending: true })
        setData(data || [])
      } catch (error) {
        console.error("Error fetching data:", error)
        setData([])
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredData = data.filter((row) => {
    const rowValues = Object.values(row).join(" ").toLowerCase()
    return rowValues.includes(search.toLowerCase())
  })

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([])
    } else {
      const allIndexes = filteredData.map((_, idx) => idx)
      setSelectedRows(allIndexes)
    }
    setSelectAll(!selectAll)
  }

  const toggleRow = (idx: number) => {
    if (selectedRows.includes(idx)) {
      setSelectedRows(selectedRows.filter((i) => i !== idx))
    } else {
      setSelectedRows([...selectedRows, idx])
    }
  }

  const exportToExcel = () => {
    const selectedData = selectedRows.map((i) => filteredData[i])
    if (selectedData.length === 0) return alert("No rows selected!")
    const worksheet = XLSX.utils.json_to_sheet(selectedData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Selected Data")
    XLSX.writeFile(workbook, "selected_procurement.xlsx")
  }

  const handleImageClick = (src: string) => {
    setSelectedImage(src)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedImage(null)
    setIsModalOpen(false)
  }

  return (
    <div className="p-8 bg-orange-100 min-h-screen">
      {/* 🔗 Home */}
      <div className="mb-6">
        <a
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          ⬅ Home
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">User Catalogue View</h1>

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
                    .filter((key) => key !== "id" && key !== "created_at")
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
                    .filter(([key]) => key !== "id" && key !== "created_at")
                    .map(([key, val], i) => (
                      <td key={i} className="border border-orange-400 px-4 py-2 text-center">
                        {key === "photo" && val ? (
                          <img
                            src={(val as string) || "/placeholder.svg"}
                            alt="Photo"
                            onClick={() => handleImageClick(val as string)}
                            className="max-w-[80px] max-h-[80px] object-contain mx-auto rounded cursor-pointer hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <span>{val as any}</span>
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 🔍 Modal */}
      {isModalOpen && selectedImage && (
        <div
          onClick={closeModal}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-[90%] max-h-[90%] rounded shadow-xl"
          />
        </div>
      )}
    </div>
  )
}
