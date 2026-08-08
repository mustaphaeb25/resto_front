import { Link } from 'react-router-dom'
import { FaInstagram, FaFacebookF, FaTripadvisor, FaPaperPlane } from 'react-icons/fa'
import { useState } from 'react'
import { useToast } from '../../context/ToastContext'
import { api } from '../../services/api'

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/stay', label: 'Stay' },
  { to: '/dine', label: 'Dine' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

const infoLinks = [
  { to: '/about', label: 'About Us' },
  { label: 'Offers' },
  { label: 'Events' },
  { label: 'FAQ' },
  { label: 'Privacy Policy' },
]

const instaImages = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=150&q=80',
  '/lobster.jpeg',
  'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=150&q=80',
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const showToast = useToast()

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitting(true)
    try {
      await api.subscribeNewsletter({ email })
      showToast('Thank you for subscribing to our newsletter!')
      setEmail('')
    } catch (err) {
      showToast(`Error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <footer className="bg-dark-green text-white pt-[60px] pb-5 mt-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr_1.5fr] gap-8 mb-10">
          <div className="footer-brand">
            <Link to="/" className="flex items-center gap-3">
              <span className="font-serif text-[1.5rem] font-bold text-white border border-white px-2 py-0.5 rounded">SH</span>
              <div>
                <h1 className="font-serif text-[1.1rem] tracking-[1.5px] leading-none text-white">SAFFRON HOUSE</h1>
                <span className="text-[0.6rem] tracking-[1.5px] text-[#A0B0A8] uppercase block mt-0.5">Boutique Hotel &amp; Restaurant</span>
              </div>
            </Link>
            <p className="text-[0.75rem] text-[#A0B0A8] my-4 leading-relaxed">A luxury boutique retreat where every detail is crafted for your comfort.</p>
            <div className="flex gap-2.5">
              {[
                { Icon: FaInstagram, href: 'https://www.instagram.com/imran45075?igsh=dnBnZ3lxaTcwbnU2' },
                { Icon: FaFacebookF, href: 'https://www.facebook.com/profile.php?id=61581190896851' },
                { Icon: FaTripadvisor, href: 'https://www.facebook.com/profile.php?id=61581190896851' },
              ].map(({ Icon, href }, i) => (
                <a key={i} href={href} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center text-[0.75rem] text-white transition-all hover:bg-gold hover:border-gold">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="uppercase text-[0.75rem] tracking-[1px] mb-4 text-gold">QUICK LINKS</h5>
            <ul className="list-none text-[0.75rem] space-y-2">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link to={link.to} className="text-[#C0C8C4] hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="uppercase text-[0.75rem] tracking-[1px] mb-4 text-gold">INFORMATION</h5>
            <ul className="list-none text-[0.75rem] space-y-2">
              {infoLinks.map((link, i) => (
                <li key={i}>
                  {link.to ? (
                    <Link to={link.to} className="text-[#C0C8C4] hover:text-white transition-colors">{link.label}</Link>
                  ) : (
                    <span className="text-[#C0C8C4]">{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="uppercase text-[0.75rem] tracking-[1px] mb-4 text-gold">FOLLOW US</h5>
            <div className="grid grid-cols-3 gap-1.5">
              {instaImages.map((src, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/imran45075?igsh=dnBnZ3lxaTcwbnU2"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Follow us on Instagram ${i + 1}`}
                >
                  <img src={src} alt={`Insta ${i + 1}`} className="w-full h-[50px] rounded transition-transform hover:scale-105 cursor-pointer" loading="lazy" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="uppercase text-[0.75rem] tracking-[1px] mb-4 text-gold">NEWSLETTER</h5>
            <p className="text-[0.75rem] text-[#A0B0A8] mb-3">Subscribe for exclusive offers and updates.</p>
            <form onSubmit={handleSubscribe} className="flex bg-white rounded-sm p-1">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-none outline-none p-2 text-[0.75rem] w-full text-text-dark placeholder:text-text-muted"
                required
              />
              <button type="submit" disabled={submitting} className="bg-gold text-white border-none rounded px-3 cursor-pointer transition-colors hover:bg-gold-hover disabled:opacity-50">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row justify-between text-[0.7rem] text-[#809088] gap-2 text-center">
          <span>&copy; 2026 Saffron House. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
