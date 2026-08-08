import { useState } from 'react'
import { FaClock, FaXmark, FaUsers } from 'react-icons/fa6'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'
import { api } from '../../services/api'
import Button from '../ui/Button'
import ReviewWidget from '../ui/ReviewWidget'

export default function ExperienceCard({ experience }) {
  const showToast = useToast()
  const { user } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    guests: '2',
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const openModal = () => {
    if (!user) {
      showToast('Please sign in to book an experience.')
      return
    }
    setModalOpen(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.createExperienceBooking({
        experienceId: experience.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        date: form.date,
        guests: parseInt(form.guests, 10),
      })
      showToast(`Booking confirmed for ${experience.name}!`)
      setModalOpen(false)
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase = 'w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors'
  const labelBase = 'block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5'

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-border shadow flex flex-col hover:-translate-y-1.5 transition-transform duration-300">
        <div className="h-[220px] overflow-hidden relative">
          <img
            src={experience.image}
            alt={experience.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-4 left-4 bg-black/60 text-white text-[0.65rem] font-bold px-2.5 py-1 rounded uppercase">
            {experience.category}
          </span>
        </div>

        <div className="p-6 flex-grow flex flex-col">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-serif text-[1.3rem]">{experience.name}</h3>
            <ReviewWidget target="EXPERIENCE" itemId={experience.id} itemName={experience.name} size="text-[0.8rem]" />
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-text-muted mb-3">
            <span className="flex items-center gap-1">
              <FaClock className="text-gold" /> {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <FaUsers className="text-gold" /> {experience.groupSize}
            </span>
          </div>

          <p className="text-[0.85rem] text-text-muted mb-5 flex-grow" style={{ lineHeight: 1.6 }}>
            {experience.description}
          </p>

          <div className="flex flex-wrap items-end justify-between gap-3 pt-4 border-t border-border">
            <div>
              <span className="text-[1.25rem] font-bold text-dark-green">${experience.price}</span>
              <span className="text-[0.75rem] text-light font-normal"> / {experience.unit}</span>
            </div>
            <Button variant="outline" onClick={openModal}>Book Now</Button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-[520px] max-h-[92dvh] sm:max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 pb-0">
              <div>
                <h3 className="font-serif text-[1.4rem]">Book Experience</h3>
                <p className="text-[0.85rem] text-text-muted mt-1">{experience.name}</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-card transition-colors cursor-pointer bg-transparent"
              >
                <FaXmark className="text-sm" />
              </button>
            </div>

            <div className="p-6">
              <div className="bg-card rounded-xl p-4 mb-6 flex items-center gap-4">
                <div className="w-[80px] h-[60px] rounded-lg overflow-hidden flex-shrink-0">
                  <img src={experience.image} alt={experience.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[1.1rem] font-bold text-dark-green">${experience.price}</span>
                    <span className="text-[0.75rem] text-text-muted"> / {experience.unit}</span>
                  </div>
                  <p className="text-[0.8rem] text-text-muted">{experience.duration} &middot; Up to {experience.groupSize} guests</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className={labelBase}>Full Name</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required className={inputBase} placeholder="John Doe" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelBase}>Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputBase} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className={labelBase}>Phone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className={inputBase} placeholder="+1 234 567 890" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelBase}>Date</label>
                    <input type="date" name="date" value={form.date} onChange={handleChange} required className={inputBase} />
                  </div>
                  <div>
                    <label className={labelBase}>Guests</label>
                    <select name="guests" value={form.guests} onChange={handleChange} className={inputBase}>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                    </select>
                  </div>
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
      )}
    </>
  )
}
