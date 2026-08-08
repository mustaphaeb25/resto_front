import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'
import FormModal from '../../components/admin/FormModal'
import { useToast } from '../../context/ToastContext'

const STATUSES = ['PENDING', 'CONFIRMED', 'CANCELLED']

export default function AdminRoomReservations() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const [newStatus, setNewStatus] = useState('')
  const [saving, setSaving] = useState(false)
  const showToast = useToast()

  const fetchData = () => {
    setLoading(true)
    api.getAdminRoomReservations()
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
      await api.updateRoomReservationStatus(selected.id, newStatus)
      showToast(`Booking status changed to ${newStatus}`)
      setModalOpen(false)
      fetchData()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    { header: 'Guest', accessor: 'guestName', render: (r) => r.guestName || r.user?.name || 'Anonymous' },
    { header: 'Email', accessor: 'guestEmail', render: (r) => r.guestEmail || r.user?.email || '—' },
    { header: 'Phone', accessor: 'guestPhone', render: (r) => r.guestPhone || '—' },
    { header: 'Room', accessor: 'room', render: (r) => r.room?.title || '—' },
    { header: 'Check-in', accessor: 'checkIn', render: (r) => new Date(r.checkIn).toLocaleDateString() },
    { header: 'Check-out', accessor: 'checkOut', render: (r) => new Date(r.checkOut).toLocaleDateString() },
    { header: 'Guests', accessor: 'guests' },
    { header: 'Status', accessor: 'status', render: (r) => (
      <span className={`text-xs px-2 py-1 rounded-full ${
        r.status === 'CONFIRMED' || r.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-700' :
        r.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
        'bg-amber-100 text-amber-700'
      }`}>{r.status.charAt(0) + r.status.slice(1).toLowerCase()}</span>
    )},
    { header: 'Date', accessor: 'createdAt', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-dark-green">Room Bookings</h1>
        <p className="text-sm text-text-muted mt-1">View and manage room reservations</p>
      </div>
      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={data} onEdit={handleEdit} emptyMessage="No room bookings yet" />
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
          <p className="text-sm text-text-muted">{selected?.guestName || selected?.user?.name || 'Anonymous'}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-text-dark mb-1">Room</label>
          <p className="text-sm text-text-muted">{selected?.room?.title || '—'}</p>
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
