import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import FormModal from '../../components/admin/FormModal'
import ImageUpload from '../../components/admin/ImageUpload'

const initialForm = {
  name: '', category: '', badge: '', description: '',
  price: '', size: '', bed: '', maxGuests: '', image: '', features: '',
}

export default function AdminRooms() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(initialForm)

  const load = () => {
    setLoading(true)
    api.getRooms().then(setRooms).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditItem(null)
    setForm(initialForm)
    setModalOpen(true)
  }

  const openEdit = (room) => {
    setEditItem(room)
    setForm({
      name: room.name || '',
      category: room.category || '',
      badge: room.badge || '',
      description: room.description || '',
      price: room.price?.toString() || '',
      size: room.size || '',
      bed: room.bed || '',
      maxGuests: room.maxGuests?.toString() || '',
      image: room.image || '',
      features: room.features?.join(', ') || '',
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        maxGuests: parseInt(form.maxGuests),
        features: form.features.split(',').map((s) => s.trim()).filter(Boolean),
      }
      if (editItem) {
        await api.updateRoom(editItem.id, payload)
      } else {
        await api.createRoom(payload)
      }
      setModalOpen(false)
      load()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (room) => {
    if (!window.confirm(`Delete "${room.name}"?`)) return
    try {
      await api.deleteRoom(room.id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price', render: (r) => `$${r.price}` },
    { header: 'Max Guests', accessor: 'maxGuests' },
    { header: 'Size', accessor: 'size' },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-serif text-dark-green">Rooms</h1>
          <p className="text-sm text-text-muted mt-1">Manage your room listings</p>
        </div>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-dark-green hover:bg-dark-green-hover rounded-lg transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Room
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={rooms} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No rooms yet" />
      </div>

      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} title={editItem ? 'Edit Room' : 'Add Room'} loading={saving}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Category</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="room, suite, villa" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Badge</label>
            <input type="text" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="Popular, Suite, Exclusive" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Price ($)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min={0} step="0.01" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Size</label>
            <input type="text" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="e.g. 38 m²" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Bed</label>
            <input type="text" value={form.bed} onChange={(e) => setForm({ ...form, bed: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="e.g. 1 King Bed" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Max Guests</label>
            <input type="number" value={form.maxGuests} onChange={(e) => setForm({ ...form, maxGuests: e.target.value })} required min={1} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Features (comma-separated)</label>
          <input type="text" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="Free Wi-Fi, Breakfast, Smart TV" />
        </div>
        <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
      </FormModal>
    </div>
  )
}
