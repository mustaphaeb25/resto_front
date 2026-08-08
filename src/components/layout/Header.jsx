import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaPhone, FaUser, FaBars, FaTimes, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaCog, FaCheck } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/stay', label: 'Stay' },
  { to: '/dine', label: 'Dine' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const location = useLocation()
  const userMenuRef = useRef(null)
  const copyTimeoutRef = useRef(null)
  const phoneTimeoutRef = useRef(null)

  const handlePhoneClick = async () => {
    if (isTouch) {
      window.location.href = 'tel:+212625193682'
      return
    }
    setPhoneOpen(true)
    const number = '+212625193682'
    try {
      await navigator.clipboard.writeText(number)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = number
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      try { document.execCommand('copy') } catch { /* noop */ }
      document.body.removeChild(textarea)
    }
    clearTimeout(copyTimeoutRef.current)
    clearTimeout(phoneTimeoutRef.current)
    setCopied(true)
    copyTimeoutRef.current = setTimeout(() => setCopied(false), 2000)
    phoneTimeoutRef.current = setTimeout(() => setPhoneOpen(false), 5000)
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => () => {
    clearTimeout(copyTimeoutRef.current)
    clearTimeout(phoneTimeoutRef.current)
  }, [])

  useEffect(() => {
    if (!window.matchMedia) return
    const mq = window.matchMedia('(pointer: coarse)')
    const update = () => setIsTouch(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <header className={`bg-white py-4 sticky top-0 z-[1000] transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <span className="font-serif text-[1.5rem] font-bold text-gold border border-gold px-2 py-0.5 rounded">SH</span>
            <div>
              <h1 className="hidden min-[400px]:block font-serif text-[1rem] sm:text-[1.1rem] tracking-[1.5px] leading-none text-text-dark">SAFFRON HOUSE</h1>
              <span className="hidden sm:block text-[0.6rem] tracking-[1.5px] text-text-light uppercase mt-0.5">Boutique Hotel &amp; Restaurant</span>
            </div>
          </Link>

          <ul className="hidden lg:flex gap-6 text-[0.85rem] font-medium">
            {navLinks.map(link => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `transition-colors ${isActive ? 'text-gold' : 'text-text-dark hover:text-gold'}`}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 text-text-dark text-[0.85rem] relative">
              <button
                onClick={handlePhoneClick}
                className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-text-dark hover:text-gold transition-colors group"
                aria-label="Copy phone number"
                aria-expanded={phoneOpen}
              >
                <span className={copied ? '' : 'group-hover:animate-[ring_0.5s_ease-in-out]'}>
                  {copied ? <FaCheck className="text-gold" /> : <FaPhone />}
                </span>
                <span role="status" aria-live="polite" className="text-[0.7rem] text-gold font-medium whitespace-nowrap">
                  {copied ? 'Copied!' : ''}
                </span>
              </button>
              {phoneOpen && (
                <>
                  <a
                    href="tel:+212625193682"
                    className="hidden xl:inline tracking-wide hover:text-gold transition-colors whitespace-nowrap"
                  >
                    +212 6 25 19 36 82
                  </a>
                  <div className="xl:hidden absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-border px-3 py-2 z-[1002]">
                    <a href="tel:+212625193682" className="flex items-center gap-2 text-[0.8rem] text-text-dark hover:text-gold transition-colors whitespace-nowrap">
                      <FaPhone className="text-gold text-[0.75rem]" />
                      +212 6 25 19 36 82
                    </a>
                  </div>
                </>
              )}
            </div>

            <div className="relative hidden lg:block" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 text-text-dark hover:text-gold transition-colors"
                aria-label={user ? 'Account menu' : 'Sign in'}
              >
                {user ? (
                  <>
                    <FaUser className="text-[1.1rem]" />
                    <span className="text-[0.8rem] font-medium">{user.name}</span>
                  </>
                ) : (
                  <span className="text-[0.85rem] font-medium">Sign In</span>
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-border py-2 min-w-[180px] z-[1002]">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-border">
                        <p className="text-[0.8rem] font-medium">{user.name}</p>
                        <p className="text-[0.7rem] text-text-muted">{user.email}</p>
                      </div>
                      {user.role === 'ADMIN' && (
                        <Link
                          to="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="block px-4 py-2 text-[0.8rem] text-text-dark hover:bg-card transition-colors flex items-center gap-2"
                        >
                          <FaCog /> Admin
                        </Link>
                      )}
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="w-full text-left px-4 py-2 text-[0.8rem] text-text-dark hover:bg-card transition-colors flex items-center gap-2 cursor-pointer border-none"
                      >
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-[0.8rem] text-text-dark hover:bg-card transition-colors flex items-center gap-2"
                      >
                        <FaSignInAlt /> Sign In
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2 text-[0.8rem] text-text-dark hover:bg-card transition-colors flex items-center gap-2"
                      >
                        <FaUserPlus /> Create Account
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="lg:hidden">
              {!user && (
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-[0.8rem] font-semibold text-text-dark hover:bg-card hover:text-gold transition-colors min-h-9"
                  aria-label="Sign in"
                >
                  <span>Sign In</span>
                </Link>
              )}
              {user && user.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className="inline-flex items-center gap-2 rounded-sm border border-gold/50 px-3 py-2 text-[0.8rem] font-semibold text-gold hover:bg-gold/10 transition-colors min-h-9"
                  aria-label="Open admin dashboard"
                >
                  <FaCog />
                  <span className="hidden min-[420px]:inline">Admin</span>
                </Link>
              )}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden bg-transparent border-none cursor-pointer p-1.5 z-[1001]"
              aria-label="Menu"
            >
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
            <Link to="/dine#table-reservation" className="hidden lg:inline-flex items-center gap-2 rounded-sm bg-dark-green text-white px-6 py-3 text-[0.85rem] font-semibold transition-all duration-300 hover:bg-dark-green-hover">RESERVE A TABLE</Link>
          </div>

          {menuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white flex flex-col overflow-y-auto px-4 sm:px-6 pb-8 max-h-[calc(100dvh-4rem)] shadow-[0_10px_15px_rgba(0,0,0,0.1)] z-[999]">
              <nav className="flex flex-col">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => `text-[0.95rem] font-medium transition-colors py-3 border-b border-border/60 ${isActive ? 'text-gold' : 'text-text-dark hover:text-gold'}`}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>
              <div className="pt-4">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-[0.85rem] text-text-muted">{user.name}</span>
                    <button
                      onClick={logout}
                      className="text-[0.85rem] text-gold hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Link to="/login" className="text-[0.85rem] text-text-dark hover:text-gold transition-colors py-1">Sign In</Link>
                    <Link to="/register" className="text-[0.85rem] text-text-dark hover:text-gold transition-colors py-1">Create Account</Link>
                  </div>
                )}
              </div>
              <Link to="/dine#table-reservation" className="inline-flex items-center justify-center gap-2 rounded-sm bg-dark-green text-white px-6 py-3.5 text-[0.85rem] font-semibold transition-all duration-300 hover:bg-dark-green-hover mt-4 w-full">RESERVE A TABLE</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
