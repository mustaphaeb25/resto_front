import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaPhone, FaUser, FaBars, FaTimes, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaCog } from 'react-icons/fa'
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
  const location = useLocation()
  const userMenuRef = useRef(null)

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

  return (
    <header className={`bg-white py-4 sticky top-0 z-[1000] transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)]' : 'shadow-[0_2px_10px_rgba(0,0,0,0.02)]'}`}>
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-serif text-[1.5rem] font-bold text-gold border border-gold px-2 py-0.5 rounded">SH</span>
            <div>
              <h1 className="font-serif text-[1.1rem] tracking-[1.5px] leading-none text-text-dark">SAFFRON HOUSE</h1>
              <span className="text-[0.6rem] tracking-[1.5px] text-text-light uppercase block mt-0.5">Boutique Hotel &amp; Restaurant</span>
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

          <div className="flex items-center gap-4">
            <a href="tel:+919876543210" className="flex items-center gap-2 text-text-dark text-[0.85rem] hover:text-gold transition-colors hidden sm:flex group whitespace-nowrap">
              <span className="group-hover:animate-[ring_0.5s_ease-in-out]"><FaPhone /></span>
              <span className="tracking-wide">+91 98765 43210</span>
            </a>

            <div className="relative hidden sm:block" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-transparent border-none cursor-pointer p-1 text-text-dark hover:text-gold transition-colors"
              >
                <FaUser className="text-[1.1rem]" />
                {user && <span className="text-[0.8rem] font-medium">{user.name}</span>}
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

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden bg-transparent border-none cursor-pointer p-1 z-[1001]"
              aria-label="Menu"
            >
              {menuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
            </button>
            <Link to="/dine" className="hidden lg:inline-flex items-center gap-2 rounded-sm bg-dark-green text-white px-6 py-3 text-[0.85rem] font-semibold transition-all duration-300 hover:bg-dark-green-hover">RESERVE A TABLE</Link>
          </div>

          {menuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white flex flex-col p-6 shadow-[0_10px_15px_rgba(0,0,0,0.1)] z-[999] gap-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => `text-[0.85rem] font-medium transition-colors ${isActive ? 'text-gold' : 'text-text-dark hover:text-gold'}`}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="border-t border-border pt-4 mt-2">
                {user ? (
                  <div className="flex items-center justify-between">
                    <span className="text-[0.8rem] text-text-muted">{user.name}</span>
                    <button
                      onClick={logout}
                      className="text-[0.8rem] text-gold hover:underline bg-transparent border-none cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <Link to="/login" className="text-[0.8rem] text-text-dark hover:text-gold transition-colors">Sign In</Link>
                    <Link to="/register" className="text-[0.8rem] text-text-dark hover:text-gold transition-colors">Create Account</Link>
                  </div>
                )}
              </div>
              <Link to="/dine" className="inline-flex items-center justify-center gap-2 rounded-sm bg-dark-green text-white px-6 py-3 text-[0.85rem] font-semibold transition-all duration-300 hover:bg-dark-green-hover mt-2">RESERVE A TABLE</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
