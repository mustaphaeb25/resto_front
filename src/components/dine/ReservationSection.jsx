import { useState } from 'react'
import { FaClock, FaPhone } from 'react-icons/fa6'
import SubHeading from '../ui/SubHeading'
import { useToast } from '../../context/ToastContext'
import { api } from '../../services/api'

export default function ReservationSection() {
  const showToast = useToast()
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    seating: 'Indoor',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createDiningReservation({
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time,
        guests: parseInt(form.guests, 10),
        seating: form.seating,
      })
      showToast(`Table reserved for ${form.name} on ${form.date} at ${form.time}.`)
      setForm({ name: '', phone: '', date: '', time: '', guests: '2', seating: 'Indoor' })
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = 'w-full p-2.5 rounded-lg border border-white/20 bg-white/10 text-white text-[0.85rem] placeholder-white/50 focus:border-gold focus:outline-none'
  const labelBase = 'block text-[0.75rem] text-gold uppercase mb-1'

  return (
    <div className="bg-dark-green text-white rounded-2xl p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
      <div>
        <SubHeading className="!text-gold">TABLE RESERVATION</SubHeading>
        <h3 className="font-serif text-[2.2rem] mb-4">Experience World-Class Dining</h3>
        <p className="text-[0.9rem] mb-6" style={{ color: '#C0C8C4' }}>
          Secure your preferred table at Saffron and enjoy an evening of culinary artistry, 
          live music, and breathtaking views.
        </p>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-gold text-[0.9rem]">
            <FaClock /> <span>Open Daily: 6:00 PM – 11:00 PM</span>
          </div>
          <div className="flex items-center gap-2 text-gold text-[0.9rem]">
            <FaPhone /> <span>+91 294 265 0000</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className={inputBase}
            />
          </div>
          <div>
            <label className={labelBase}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
              className={inputBase}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className={inputBase}
            />
          </div>
          <div>
            <label className={labelBase}>Time</label>
            <select name="time" value={form.time} onChange={handleChange} required className={inputBase}>
              <option value="">Select Time</option>
              <option>6:00 PM</option>
              <option>6:30 PM</option>
              <option>7:00 PM</option>
              <option>7:30 PM</option>
              <option>8:00 PM</option>
              <option>8:30 PM</option>
              <option>9:00 PM</option>
              <option>9:30 PM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelBase}>Guests</label>
            <select name="guests" value={form.guests} onChange={handleChange} className={inputBase}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7+</option>
            </select>
          </div>
          <div>
            <label className={labelBase}>Seating</label>
            <select name="seating" value={form.seating} onChange={handleChange} className={inputBase}>
              <option>Indoor</option>
              <option>Outdoor</option>
              <option>Rooftop</option>
              <option>Private</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-gold text-dark-green font-bold py-3 px-6 rounded-lg text-[0.85rem] mt-2 cursor-pointer hover:opacity-90 transition-opacity border-0 disabled:opacity-50"
        >
          {submitting ? 'SUBMITTING...' : 'CONFIRM TABLE RESERVATION'}
        </button>
      </form>
    </div>
  )
}
