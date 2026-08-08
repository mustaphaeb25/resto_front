import { useState } from 'react'
import { useToast } from '../../context/ToastContext'
import { api } from '../../services/api'
import Button from '../ui/Button'
import { subjectOptions } from '../../data/contactInfo'

export default function ContactForm() {
  const showToast = useToast()
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await api.submitContact({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject,
        message: form.message,
      })
      showToast('Thank you for your message! We will get back to you within 24 hours.')
      setForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-9 border border-border">
      <h3 className="font-serif text-[1.6rem] mb-2">Send Us a Message</h3>
      <p className="text-[0.85rem] text-text-muted mb-6">
        Fill out the form below and our team will respond within 24 hours.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">
              Subject
            </label>
            <select
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
              onInvalid={(e) => e.target.setCustomValidity('Please select a subject')}
              onInput={(e) => e.target.setCustomValidity('')}
              className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
            >
              <option value="">Select a subject</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors h-[120px]"
          />
        </div>

        <Button variant="primary" className="w-full" disabled={submitting}>
          {submitting ? 'SENDING...' : 'SEND MESSAGE'}
        </Button>
      </form>
    </div>
  )
}
