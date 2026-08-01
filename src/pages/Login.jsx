import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import PageBanner from '../components/layout/PageBanner'
import Button from '../components/ui/Button'

export default function Login() {
  const { login } = useAuth()
  const showToast = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await login(form.email, form.password)
      showToast('Welcome back!')
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
        subtitle="WELCOME BACK"
        title="Sign In"
        description="Access your account to manage reservations and bookings."
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
      />
      <div className="max-w-[460px] mx-auto py-16 px-6">
        <div className="bg-white rounded-2xl p-9 border border-border">
          <h3 className="font-serif text-[1.6rem] mb-2">Sign In</h3>
          <p className="text-[0.85rem] text-text-muted mb-6">
            Enter your email and password to access your account.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              <label className="block text-[0.75rem] font-bold text-text-muted uppercase tracking-wide mb-1.5">Password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full p-2.5 pl-3.5 border border-border rounded-lg text-[0.85rem] bg-body focus:border-gold outline-none transition-colors"
              />
            </div>
            <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
              {submitting ? 'SIGNING IN...' : 'SIGN IN'}
            </Button>
          </form>
          <p className="text-[0.8rem] text-text-muted text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
