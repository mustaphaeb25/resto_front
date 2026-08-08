import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import PageBanner from '../components/layout/PageBanner'
import Button from '../components/ui/Button'

export default function Register() {
  const { register } = useAuth()
  const showToast = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await register(form.name, form.email, form.password, form.phone || undefined)
      showToast('Account created successfully!')
      navigate('/')
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <PageBanner
        subtitle="JOIN US"
        title="Create Account"
        description="Create an account to manage your reservations and enjoy exclusive offers."
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
      />
      <div className="max-w-[460px] mx-auto py-10 sm:py-16 px-4 sm:px-6">
        <div className="bg-white rounded-2xl p-6 sm:p-9 border border-border">
          <h3 className="font-serif text-[1.6rem] mb-2">Create Account</h3>
          <p className="text-[0.85rem] text-text-muted mb-6">
            Fill in the details below to create your account.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">Phone (optional)</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={10}
                title="Password must be at least 10 characters and contain at least one letter and one number"
                className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
              {submitting ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
            </Button>
          </form>
          <p className="text-[0.8rem] text-text-muted text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-gold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
