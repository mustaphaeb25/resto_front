import { useState, useEffect } from 'react'
import { FaQuoteLeft, FaStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { testimonials } from '../../data/testimonials'
import FadeIn from '../ui/FadeIn'

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  const next = () => setCurrent((i) => (i === testimonials.length - 1 ? 0 : i + 1))

  useEffect(() => {
    const timer = setInterval(next, 6000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[current]

  return (
    <FadeIn direction="right" className="bg-card rounded-2xl p-6 sm:p-9">
      <FaQuoteLeft className="text-gold/40 text-[3rem] mb-4" />
      <h4 className="font-serif text-[1.2rem] mb-4">What Our Guests Say</h4>
      <p className="font-serif text-[1.1rem] italic leading-[1.5] min-h-[80px] mb-6">
        {t.text}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="text-[0.85rem] font-bold">{t.name}</p>
            <p className="text-[0.75rem] text-text-light">{t.location}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: t.stars }).map((_, i) => (
              <FaStar key={i} className="text-gold text-[0.75rem]" />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-dark-green hover:text-white hover:border-dark-green transition-all duration-300 cursor-pointer"
            >
              <FaArrowLeft className="text-xs" />
            </button>
            <button
              onClick={next}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center hover:bg-dark-green hover:text-white hover:border-dark-green transition-all duration-300 cursor-pointer"
            >
              <FaArrowRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </FadeIn>
  )
}
