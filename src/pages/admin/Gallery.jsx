import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import FormModal from '../../components/admin/FormModal'
import ImageUpload from '../../components/admin/ImageUpload'
import { useToast } from '../../context/ToastContext'

export default function AdminGallery() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [form, setForm] = useState({ label: '', category: '', image: '' })
  const showToast = useToast()

  const load = () => {
    setLoading(true)
    api.getGallery().then(setItems).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const openCreate = () => {
    setEditItem(null)
    setForm({ label: '', category: '', image: '' })
    setModalOpen(true)
  }

  const openEdit = (item) => {
    setEditItem(item)
    setForm({ label: item.label || '', category: item.category || '', image: item.image || '' })
    setModalOpen(true)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editItem) {
        await api.updateGalleryItem(editItem.id, form)
      } else {
        await api.createGalleryItem(form)
      }
      setModalOpen(false)
      load()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (item) => {
    try {
      await api.deleteGalleryItem(item.id)
      showToast('Gallery item deleted')
      load()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    }
  }

  const columns = [
    {
      header: 'Image',
      accessor: 'image',
      render: (r) => r.image ? <img src={r.image} alt={r.label} className="w-16 h-12 object-cover rounded-lg" /> : '—',
    },
    { header: 'Label', accessor: 'label' },
    { header: 'Category', accessor: 'category' },
  ]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-serif text-dark-green">Gallery</h1>
          <p className="text-sm text-text-muted mt-1">Manage gallery images</p>
        </div>
        <button onClick={openCreate} className="px-4 py-2 text-sm font-medium text-white bg-dark-green hover:bg-dark-green-hover rounded-lg transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Image
        </button>
      </div>

      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} emptyMessage="No gallery items yet" />
      </div>

      <FormModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} title={editItem ? 'Edit Gallery Item' : 'Add Gallery Item'} loading={saving}>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Label</label>
          <input type="text" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Category</label>
          <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold" placeholder="e.g. rooms, dining, spa, exterior" />
        </div>
        <ImageUpload value={form.image} onChange={(v) => setForm({ ...form, image: v })} label="Image" />
      </FormModal>
    </div>
  )
}
