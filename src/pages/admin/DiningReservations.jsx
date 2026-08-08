import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import FormModal from '../../components/admin/FormModal'
import { useToast } from '../../context/ToastContext'

const STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED']

export default function AdminDiningReservations() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const showToast = useToast()

  const fetchData = () => {
    setLoading(true)
    api.getAdminDiningReservations()
      .then((res) => setData(Array.isArray(res) ? res : res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchData() }, [])

  const handleEdit = (row) => {
    setSelected(row)
    setNewStatus(row.status)
    setModalOpen(true)
  }

  const handleStatusChange = async (e) => {
    e.preventDefault()
    if (!selected || newStatus === selected.status) {
      setModalOpen(false)
      return
    }
    setSaving(true)
    try {
      await api.updateDiningReservationStatus(selected.id, newStatus)
      showToast(`Booking status changed to ${newStatus.charAt(0) + newStatus.slice(1).toLowerCase()}`)
      setModalOpen(false)
      fetchData()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'Date', accessor: 'date', render: (r) => new Date(r.date).toLocaleDateString() },
    { header: 'Time', accessor: 'time' },
    { header: 'Guests', accessor: 'guests' },
    { header: 'Status', accessor: 'status', render: (r) => (
      <span className={`text-xs px-2 py-1 rounded-full ${
        r.status === 'CONFIRMED' || r.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
        r.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
        'bg-amber-100 text-amber-700'
      }`}>{r.status.charAt(0) + r.status.slice(1).toLowerCase()}</span>
    )},
    { header: 'Booked', accessor: 'createdAt', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-dark-green">Dining Bookings</h1>
        <p className="text-sm text-text-muted mt-1">View and manage restaurant reservations</p>
      </div>
      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={data} onEdit={handleEdit} emptyMessage="No dining reservations yet" />
      </div>

      <FormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleStatusChange}
        title="Change Booking Status"
        loading={saving}
      >
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Guest</label>
          <p className="text-sm text-text-muted">{selected?.name || '—'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Date / Time</label>
          <p className="text-sm text-text-muted">
            {selected ? `${new Date(selected.date).toLocaleDateString()} at ${selected.time}` : '—'}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Current Status</label>
          <p className="text-sm text-text-muted mb-2">{selected?.status}</p>
          <label className="block text-sm font-medium text-text-dark mb-1">New Status</label>
          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
            ))}
          </select>
        </div>
      </FormModal>
    </div>
  )
}
