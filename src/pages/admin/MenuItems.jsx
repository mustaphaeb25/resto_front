import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import FormModal from '../../components/admin/FormModal'
import ImageUpload from '../../components/admin/ImageUpload'

export default function AdminMenuItems() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ name: '', category: '', description: '', price: '', image: '' })

  const load = () => {
    setLoading(true)
    api.getMenuItems().then(setItems).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditItem(null)
    setForm({ name: '', category: '', description: '', price: '', image: '' })
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditItem(item)
    setForm({
      name: item.name || '',
      category: item.category || '',
      description: item.description || '',
      price: item.price?.toString() || '',
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
        await api.updateMenuItem(editItem.id, payload)
      } else {
        await api.createMenuItem(payload)
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
      await api.deleteMenuItem(item.id)
      load()
    } catch (err) {
      alert(err.message)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price', render: (r) => `$${r.price}` },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif text-dark-green">Menu Items</h1>
          <p className="text-sm text-text-muted mt-1">Manage your restaurant menu</p>
        </div>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-dark-green hover:bg-dark-green-hover rounded-lg transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Menu Item
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No menu items yet" />
      </div>

      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} title={editItem ? 'Edit Menu Item' : 'Add Menu Item'} loading={saving}>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Name</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Category</label>
          <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="e.g. starter, main, dessert, drink" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Description</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-dark mb-1">Price ($)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required min={0} step="0.01" className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
          </div>
        </div>
        <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} />
      </FormModal>
    </div>
  )
}
