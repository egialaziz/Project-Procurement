"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import * as XLSX from "xlsx"
import Image from "next/image"

export default function UserCatalogue() {
  const [data, setData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selectedRows, setSelectedRows] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [loading, setLoading] = useState(true)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 10

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

  const filteredData = data.filter((row) =>
    Object.values(row).join(" ").toLowerCase().includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredData.length / rowsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handleSelectAll = () => {
    const pageIndexes = paginatedData.map((_, idx) => (currentPage - 1) * rowsPerPage + idx)
    setSelectedRows(selectAll ? selectedRows.filter(i => !pageIndexes.includes(i)) : [...new Set([...selectedRows, ...pageIndexes])])
    setSelectAll(!selectAll)
  }

  const toggleRow = (idx: number) => {
    const globalIndex = (currentPage - 1) * rowsPerPage + idx
    setSelectedRows(prev =>
      prev.includes(globalIndex)
        ? prev.filter(i => i !== globalIndex)
        : [...prev, globalIndex]
    )
  }

  const exportToExcel = () => {
    const selectedData = selectedRows.map(i => filteredData[i])
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
      <div className="mb-6">
        <a
          href="/"
          className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow"
        >
          ⬅ Home
        </a>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center text-orange-700">User Catalogue View</h1>

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search..."
          className="border border-orange-400 rounded px-4 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
        />
        <button
          onClick={exportToExcel}
          className="ml-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded shadow"
        >
          Export Selected
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded bg-white">
        {loading ? (
          <p className="text-center py-6 text-orange-600 font-semibold">Loading data...</p>
        ) : (
          <table className="min-w-full border-collapse border border-orange-400 text-sm">
            <thead>
              <tr>
                <th className="border border-orange-400 px-4 py-2 bg-orange-200 text-sm">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                {paginatedData[0] &&
                  Object.keys(paginatedData[0])
                    .filter((key) => key !== "id" && key !== "created_at")
                    .map((key) => (
                      <th key={key} className="border border-orange-400 px-4 py-2 bg-orange-200 text-sm">
                        {key}
                      </th>
                    ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-orange-100">
                  <td className="border border-orange-400 px-4 py-2 text-center text-sm">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes((currentPage - 1) * rowsPerPage + idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                  {Object.entries(row)
                    .filter(([key]) => key !== "id" && key !== "created_at")
                    .map(([key, val], i) => (
                      <td key={i} className="border border-orange-400 px-4 py-2 text-center text-sm">
                        {key === "photo" && val ? (
                          <Image
                            src={val as string}
                            alt="Photo"
                            width={80}
                            height={80}
                            onClick={() => handleImageClick(val as string)}
                            className="object-contain mx-auto rounded cursor-pointer hover:scale-105 transition-transform duration-200"
                            loading="lazy"
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-orange-700 font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      {/* Image Modal */}
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
