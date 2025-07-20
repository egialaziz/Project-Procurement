'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { v4 as uuidv4 } from 'uuid'

export default function UploadPage() {
  const router = useRouter()

  const [newItem, setNewItem] = useState<any>({
    no: '',
    spesifikasi: '',
    minimum_pemesanan: '',
    estimasi_harga_min_pemesanan: '',
    po_terbit: '',
    vendor: '',
    jenis: '',
    photo: '',
  })

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Ambil no terakhir dari Supabase dan set nilai awal otomatis
  useEffect(() => {
    const fetchLastNo = async () => {
      const { data, error } = await supabase
        .from('procurement_catalogue')
        .select('no')
        .order('no', { ascending: false })
        .limit(1)

      if (!error && data && data.length > 0) {
        setNewItem((prev: any) => ({ ...prev, no: data[0].no + 1 }))
      } else {
        setNewItem((prev: any) => ({ ...prev, no: 1 }))
      }
    }

    fetchLastNo()
  }, [])

  const handleAddItem = async () => {
    if (!newItem.spesifikasi || !newItem.estimasi_harga_min_pemesanan) {
      setMessage('⚠️ Kolom wajib tidak boleh kosong.')
      return
    }

    setLoading(true)
    setMessage('')

    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const filePath = `Pic/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)

      if (uploadError) {
        console.error('Upload error:', uploadError.message)
        setMessage('❌ Gagal upload gambar.')
        setLoading(false)
        return
      }

      const photoUrl = `https://kcdhimdqvxsrkmugecmd.supabase.co/storage/v1/object/public/images/${filePath}`
      newItem.photo = photoUrl
    }

    const { error } = await supabase.from('procurement_catalogue').insert([newItem])
    if (error) {
      console.error(error)
      setMessage('❌ Gagal menambahkan item.')
    } else {
      setMessage('✅ Item berhasil ditambahkan.')
      setNewItem((prev: any) => ({
        ...prev,
        no: prev.no + 1, // increment otomatis
        spesifikasi: '',
        minimum_pemesanan: '',
        estimasi_harga_min_pemesanan: '',
        po_terbit: '',
        vendor: '',
        jenis: '',
        photo: '',
      }))
      setFile(null)
    }

    setLoading(false)
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-orange-600">Tambah Item Baru</h1>
        <button
          onClick={() => router.push('/admin/catalogue')}
          className="bg-gray-300 hover:bg-gray-400 text-black font-medium px-4 py-2 rounded shadow"
        >
          ← Kembali ke Catalogue
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <input
          type="number"
          placeholder="No"
          value={newItem.no}
          disabled
          className="border border-orange-400 px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
        />

        <input
          type="text"
          placeholder="Spesifikasi"
          value={newItem.spesifikasi}
          onChange={(e) => setNewItem({ ...newItem, spesifikasi: e.target.value })}
          className="border border-orange-400 px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Minimum Pemesanan"
          value={newItem.minimum_pemesanan}
          onChange={(e) => setNewItem({ ...newItem, minimum_pemesanan: e.target.value })}
          className="border border-orange-400 px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Harga Minimum"
          value={newItem.estimasi_harga_min_pemesanan}
          onChange={(e) => setNewItem({ ...newItem, estimasi_harga_min_pemesanan: e.target.value })}
          className="border border-orange-400 px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="PO Terbit"
          value={newItem.po_terbit}
          onChange={(e) => setNewItem({ ...newItem, po_terbit: e.target.value })}
          className="border border-orange-400 px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Vendor"
          value={newItem.vendor}
          onChange={(e) => setNewItem({ ...newItem, vendor: e.target.value })}
          className="border border-orange-400 px-3 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Jenis"
          value={newItem.jenis}
          onChange={(e) => setNewItem({ ...newItem, jenis: e.target.value })}
          className="border border-orange-400 px-3 py-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="border border-orange-400 px-3 py-2 rounded"
        />
      </div>

      <button
        onClick={handleAddItem}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded shadow"
      >
        {loading ? 'Menyimpan...' : 'Simpan'}
      </button>

      {message && <p className="mt-4 text-center text-sm font-medium text-orange-700">{message}</p>}
    </div>
  )
}
