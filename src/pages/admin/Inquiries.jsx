import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import { useToast } from '../../context/ToastContext'

export default function AdminInquiries() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const showToast = useToast()

  const load = () => {
    setLoading(true)
    api.getInquiries().then(setData).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleMarkRead = async (item) => {
    if (item.read) return
    try {
      await api.markInquiryRead(item.id)
      load()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    }
  }

  const handleDelete = async (item) => {
    try {
      await api.deleteInquiry(item.id)
      showToast('Inquiry deleted')
      load()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Subject', accessor: 'subject' },
    { header: 'Message', accessor: 'message', render: (r) => (
      <span className="max-w-xs truncate block">{r.message}</span>
    )},
    { header: 'Status', accessor: 'read', render: (r) => (
      <button
        onClick={() => handleMarkRead(r)}
        className={`text-xs px-2 py-1 rounded-full cursor-pointer ${
          r.read ? 'bg-card text-text-muted' : 'bg-gold/20 text-gold font-medium hover:bg-gold/30'
        }`}
      >
        {r.read ? 'Read' : 'New'}
      </button>
    )},
    { header: 'Date', accessor: 'createdAt', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-dark-green">Contact Inquiries</h1>
        <p className="text-sm text-text-muted mt-1">Messages from the contact form</p>
      </div>
      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={data} onDelete={handleDelete} emptyMessage="No inquiries yet" />
      </div>
    </div>
  )
}
