import { useState, useRef } from 'react'
import { api } from '../../services/api'

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const result = await api.uploadFile(formData)
      onChange(`http://localhost:5000${result.url}`)
    } catch (err) {
      alert(err.message)
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-text-dark mb-1">{label}</label>
      <div className="flex flex-col sm:flex-row items-start gap-3">
        <div className="flex-1 w-full">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Paste image URL or upload below"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold mb-2"
          />
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gold bg-gold/10 rounded-lg cursor-pointer hover:bg-gold/20 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="hidden" />
            </label>
            {uploading && <span className="text-xs text-text-muted animate-pulse">Uploading...</span>}
          </div>
        </div>
        {value && (
          <div className="shrink-0">
            <img
              src={value}
              alt="Preview"
              className="w-20 h-20 rounded-lg object-cover border border-border"
              onError={(e) => { e.target.style.display = 'none' }}
            />
          </div>
        )}
      </div>
    </div>
  )
}