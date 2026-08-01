import { useState, useEffect } from 'react'
import { api } from '../../services/api'

export default function AdminUploads() {
  const [uploads, setUploads] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)

  const load = () => {
    setLoading(true)
    api.getUploads().then(setUploads).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      await api.uploadFile(formData)
      load()
    } catch (err) {
      alert(err.message)
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const formatSize = (bytes) => {
    if (!bytes) return '—'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-serif text-dark-green">Uploads</h1>
          <p className="text-sm text-text-muted mt-1">Manage file uploads</p>
        </div>
        <label className="px-4 py-2 text-sm font-medium text-white bg-dark-green hover:bg-dark-green-hover rounded-lg transition-colors cursor-pointer flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          {uploading ? 'Uploading...' : 'Upload File'}
          <input type="file" onChange={handleUpload} disabled={uploading} className="hidden" />
        </label>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-4">
              <div className="aspect-square bg-card rounded-lg animate-pulse mb-3" />
              <div className="h-3 w-20 bg-card rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : uploads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg className="w-12 h-12 text-text-light mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-text-muted text-sm">No uploads yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {uploads.map((u) => {
            const isImage = u.mimetype?.startsWith('image/')
            return (
              <div key={u.id} className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-sm transition-shadow">
                <div className="aspect-square bg-card">
                  {isImage ? (
                    <img src={`http://localhost:5000${u.url}`} alt={u.filename} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs text-text-muted truncate">{u.filename}</p>
                  <p className="text-xs text-text-light">{formatSize(u.size)}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
