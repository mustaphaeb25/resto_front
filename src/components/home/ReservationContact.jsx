import { useState } from 'react'
import { FaCalendar, FaClock, FaPhone, FaRegEnvelope, FaGlobe, FaUser, FaConciergeBell } from 'react-icons/fa'
import { FaLocationDot, FaUsers } from 'react-icons/fa6'
import { contactInfo } from '../../data/contactInfo'
import { useToast } from '../../context/ToastContext'
import { api } from '../../services/api'
import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'
import Button from '../ui/Button'

const initialForm = { name: '', phone: '', date: '', time: '', guests: '' }

const today = new Date()
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

export default function ReservationContact() {
  const showToast = useToast()
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createDiningReservation({
        name: form.name,
        phone: form.phone,
        date: form.date,
        time: form.time,
        guests: parseInt(form.guests, 10) || 2,
        seating: 'Indoor',
      })
      showToast('Reservation submitted! We will confirm your table shortly.')
      setForm(initialForm)
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = 'w-full p-2.5 pl-8 border border-border rounded-lg text-[0.75rem] bg-transparent focus:border-gold outline-none transition-colors'

  const contacts = [
    { icon: <FaLocationDot />, text: contactInfo.address },
    { icon: <FaPhone />, text: contactInfo.phone },
    { icon: <FaRegEnvelope />, text: contactInfo.email },
    { icon: <FaGlobe />, text: contactInfo.website },
  ]

  return (
    <FadeIn className="bg-card rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
      <div>
        <SubHeading>RESERVATION</SubHeading>
        <h4 className="font-serif text-[1.3rem] sm:text-[1.4rem] mb-5">Book Your Table</h4>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
            <div className="relative">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputBase}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-xs"><FaUser /></span>
            </div>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={form.phone}
                onChange={handleChange}
                required
                className={inputBase}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-xs"><FaPhone /></span>
            </div>
            <div className="relative">
              <input
                type="date"
                name="date"
                min={todayStr}
                value={form.date}
                onChange={handleChange}
                required
                className={inputBase}
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-xs"><FaCalendar /></span>
            </div>
            <div className="relative">
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                onInvalid={(e) => e.target.setCustomValidity('Please select a time')}
                onInput={(e) => e.target.setCustomValidity('')}
                className={inputBase}
              >
                <option value="">Time</option>
                <option>7:00 AM</option>
                <option>8:00 AM</option>
                <option>9:00 AM</option>
                <option>12:00 PM</option>
                <option>1:00 PM</option>
                <option>6:00 PM</option>
                <option>7:00 PM</option>
                <option>8:00 PM</option>
                <option>9:00 PM</option>
              </select>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-xs"><FaClock /></span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <select
                name="guests"
                value={form.guests}
                onChange={handleChange}
                required
                onInvalid={(e) => e.target.setCustomValidity('Please select number of guests')}
                onInput={(e) => e.target.setCustomValidity('')}
                className={inputBase}
              >
                <option value="">Number of Guests</option>
                <option>1 Guest</option>
                <option>2 Guests</option>
                <option>3 Guests</option>
                <option>4 Guests</option>
                <option>5+ Guests</option>
              </select>
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light text-xs"><FaUsers /></span>
            </div>
            <Button type="submit" variant="primary" disabled={submitting} className="flex-1 w-full sm:w-auto">
              {submitting ? 'SUBMITTING...' : 'RESERVE NOW'} {!submitting && <FaConciergeBell />}
            </Button>
          </div>
        </form>
      </div>

      <div>
        <SubHeading>CONTACT US</SubHeading>
        <div className="flex flex-col gap-4 mb-6">
          {contacts.map((c, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="text-gold">{c.icon}</span>
              <span className="text-[0.8rem] text-text-muted">{c.text}</span>
            </div>
          ))}
        </div>
        <div className="h-[100px] rounded-lg overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
            alt="Map"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </FadeIn>
  )
}
