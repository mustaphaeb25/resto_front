import { useState, useEffect } from 'react'
import { useToast } from '../../context/ToastContext'
import Button from '../ui/Button'

export default function SearchBar({ onSearch, category }) {
  const showToast = useToast()

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  const threeDays = new Date(today)
  threeDays.setDate(threeDays.getDate() + 3)

  const formatDate = (d) => d.toISOString().split('T')[0]

  const [formData, setFormData] = useState({
    checkIn: formatDate(tomorrow),
    checkOut: formatDate(threeDays),
    guests: '2 Adults',
    category: 'all',
  })

  useEffect(() => {
    setFormData((prev) => ({ ...prev, category }))
  }, [category])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(formData)
    showToast('Showing available options for your selected dates.')
  }

  const fieldBase = 'w-full p-2.5 border border-border rounded-lg bg-card text-[0.85rem] focus:border-gold focus:outline-none'
  const labelBase = 'block text-[0.75rem] font-bold uppercase text-text-muted mb-1.5'

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-5 px-7 shadow border border-border mb-12 grid gap-4 items-end"
      style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr auto' }}
    >
      <div>
        <label className={labelBase}>Check-In</label>
        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className={fieldBase}
        />
      </div>

      <div>
        <label className={labelBase}>Check-Out</label>
        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className={fieldBase}
        />
      </div>

      <div>
        <label className={labelBase}>Guests</label>
        <select name="guests" value={formData.guests} onChange={handleChange} className={fieldBase}>
          <option>1 Adult</option>
          <option>2 Adults</option>
          <option>2 Adults 1 Child</option>
          <option>4 Adults Family</option>
        </select>
      </div>

      <div>
        <label className={labelBase}>Room Category</label>
        <select name="category" value={formData.category} onChange={handleChange} className={fieldBase}>
          <option value="all">All</option>
          <option value="room">Rooms</option>
          <option value="suite">Suites</option>
          <option value="villa">Villas</option>
        </select>
      </div>

      <Button type="submit">CHECK AVAILABILITY</Button>
    </form>
  )
}
