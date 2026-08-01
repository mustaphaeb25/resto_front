import { useState, useEffect, useCallback } from 'react'
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa'

export default function Lightbox({ images, initialIndex = 0, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  const navigate = useCallback((dir) => {
    setCurrentIndex((prev) => (prev + dir + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, navigate])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/92 opacity-100 visible transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button onClick={onClose} className="absolute top-5 right-6 text-white text-3xl bg-none border-none cursor-pointer hover:text-gold transition-colors" aria-label="Close">
        <FaTimes />
      </button>
      <button onClick={() => navigate(-1)} className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border-none text-white text-xl flex items-center justify-center cursor-pointer hover:bg-white/25 transition-all" aria-label="Previous">
        <FaArrowLeft />
      </button>
      <img src={images[currentIndex]} alt="Gallery" className="max-w-[85vw] max-h-[85vh] rounded-md object-contain" />
      <button onClick={() => navigate(1)} className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 border-none text-white text-xl flex items-center justify-center cursor-pointer hover:bg-white/25 transition-all" aria-label="Next">
        <FaArrowRight />
      </button>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-[0.85rem]">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
