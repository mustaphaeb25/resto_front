import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useToast } from '../../context/ToastContext'
import { api } from '../../services/api'

export default function RoomBookingModal({ room, isOpen, onClose }) {
  const showToast = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    guestName: '',
    guestPhone: '',
    guestEmail: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createRoomReservation({
        roomId: room.id,
        guestName: form.guestName,
        guestPhone: form.guestPhone || undefined,
        guestEmail: form.guestEmail || undefined,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: parseInt(form.guests, 10),
      })
      showToast(`Booking request sent for ${room.name}! We will confirm shortly.`)
      onClose()
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  if (!isOpen) return null

  const inputBase = 'w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors'
  const labelBase = 'block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5'

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-[520px] max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <h3 className="font-serif text-[1.4rem]">Book This Room</h3>
            <p className="text-[0.85rem] text-text-muted mt-1">{room.name}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors cursor-pointer bg-transparent"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-card rounded-xl p-4 mb-6 flex items-center gap-4">
            <div className="w-[80px] h-[60px] rounded-lg overflow-hidden flex-shrink-0">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[1.1rem] font-bold text-dark-green">${room.price}</span>
                <span className="text-[0.75rem] text-text-muted">/ night</span>
              </div>
              <p className="text-[0.8rem] text-text-muted">{room.size} &middot; {room.bed} &middot; Up to {room.maxGuests} guests</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className={labelBase}>Full Name</label>
              <input type="text" name="guestName" value={form.guestName} onChange={handleChange} required className={inputBase} placeholder="John Doe" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Phone</label>
                <input type="tel" name="guestPhone" value={form.guestPhone} onChange={handleChange} className={inputBase} placeholder="+212 6 25 19 36 82" />
              </div>
              <div>
                <label className={labelBase}>Email</label>
                <input type="email" name="guestEmail" value={form.guestEmail} onChange={handleChange} className={inputBase} placeholder="john@example.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelBase}>Check-In</label>
                <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange} required className={inputBase} />
              </div>
              <div>
                <label className={labelBase}>Check-Out</label>
                <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange} required className={inputBase} />
              </div>
            </div>

            <div>
              <label className={labelBase}>Guests</label>
              <select name="guests" value={form.guests} onChange={handleChange} className={inputBase}>
                {Array.from({ length: room.maxGuests }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'Guest' : 'Guests'}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-dark-green text-white font-bold py-3 px-6 rounded-lg text-[0.85rem] mt-2 cursor-pointer hover:bg-dark-green-hover transition-colors border-0 disabled:opacity-50"
            >
              {submitting ? 'SUBMITTING...' : 'CONFIRM BOOKING'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
