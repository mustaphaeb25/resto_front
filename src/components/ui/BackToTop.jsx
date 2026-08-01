import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed bottom-6 left-6 z-[1500] w-11 h-11 rounded-full bg-dark-green text-white border-none flex items-center justify-center text-base shadow-lg transition-all duration-300 cursor-pointer hover:bg-dark-green-hover hover:-translate-y-0.5 ${
        visible ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-5'
      }`}
    >
      <FaArrowUp />
    </button>
  )
}
