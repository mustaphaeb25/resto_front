import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import DataTable from '../../components/admin/DataTable'

export default function AdminSubscribers() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getSubscribers()
      .then((res) => setData(Array.isArray(res) ? res : res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const columns = [
    { header: 'Email', accessor: 'email' },
    { header: 'Status', accessor: 'subscribed', render: (r) => (
      <span className={`text-xs px-2 py-1 rounded-full ${r.subscribed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
        {r.subscribed ? 'Subscribed' : 'Unsubscribed'}
      </span>
    )},
    { header: 'Date', accessor: 'createdAt', render: (r) => new Date(r.createdAt).toLocaleDateString() },
  ]

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-serif text-dark-green">Newsletter Subscribers</h1>
        <p className="text-sm text-text-muted mt-1">People who subscribed to your newsletter</p>
      </div>
      <div className="bg-white rounded-xl border border-border">
        <DataTable columns={columns} data={data} actions={false} emptyMessage="No subscribers yet" />
      </div>
    </div>
  )
}
