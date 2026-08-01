import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import FormModal from '../../components/admin/FormModal'
import ImageUpload from '../../components/admin/ImageUpload'

const initialForm = {
  name: '', category: '', description: '',
  price: '', duration: '', groupSize: '', unit: '', image: '',
}

export default function AdminExperiences() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState(initialForm)

  const load = () => {
    setLoading(true)
    api.getExperiences().then(setItems).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditItem(null)
    setForm(initialForm)
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditItem(item)
    setForm({
      name: item.name || '',
      category: item.category || '',
      description: item.description || '',
      price: item.price?.toString() || '',
      duration: item.duration || '',
      groupSize: item.groupSize || '',
      unit: item.unit || '',
      image: item.image || '',
    })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = { ...form, price: parseFloat(form.price) }
      if (editItem) {
        await api.updateExperience(editItem.id, payload)
      } else {
        await api.createExperience(payload)
      }
      setModalOpen(false)
      load()
    } catch (err) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(`Delete "${item.name}"?`)) return
    try {
      await api.deleteExperience(item.id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price', render: (r) => `$${r.price}` },
    { header: 'Duration', accessor: 'duration' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif text-dark-green">Experiences</h1>
          <p className="text-sm text-text-muted mt-1">Manage your curated experiences</p>
        </div>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-dark-green hover:bg-dark-green-hover rounded-lg transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Experience
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No experiences yet" />
      </div>

      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} title={editItem ? 'Edit Experience' : 'Add Experience'} loading={saving}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Name</label>
            <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Category</label>
            <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="wellness, culinary, adventure" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Price ($)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min={0} step="0.01" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Duration</label>
            <input type="text" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="2 hours, Full day" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Group Size</label>
            <input type="text" value={form.groupSize} onChange={(e) => setForm({ ...form, groupSize: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="Up to 8, Individual" />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Unit</label>
            <input type="text" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="person, couple" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
        </div>
        <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
      </FormModal>
    </div>
  )
}
