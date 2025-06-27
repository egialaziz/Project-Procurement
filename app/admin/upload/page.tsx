<div className="grid grid-cols-1 gap-4 mb-4">
  <input
    type="number"
    placeholder="No"
    value={newItem.no}
    onChange={(e) => setNewItem({ ...newItem, no: Number(e.target.value) })}
    className="border border-orange-400 px-3 py-2 rounded"
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
    value={newItem.harga_minimum}
    onChange={(e) => setNewItem({ ...newItem, harga_minimum: e.target.value })}
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
    type="text"
    placeholder="URL Foto"
    value={newItem.photo}
    onChange={(e) => setNewItem({ ...newItem, photo: e.target.value })}
    className="border border-orange-400 px-3 py-2 rounded"
  />
</div>
