import { useState } from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function StarRating({ value = 0, onChange, size = 'text-[0.9rem]' }) {
  const [hover, setHover] = useState(null)
  const interactive = typeof onChange === 'function'
  const effective = hover ?? value

  const renderIcon = (position) => {
    if (effective >= position) return <FaStar />
    if (effective >= position - 0.5) return <FaStarHalfAlt />
    return <FaRegStar />
  }

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((position) => (
        <span
          key={position}
          className={`${size} leading-none transition-colors ${
            effective >= position ? 'text-gold' : effective >= position - 0.5 ? 'text-gold' : 'text-text-light/40'
          } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
          onMouseEnter={interactive ? () => setHover(position) : undefined}
          onMouseLeave={interactive ? () => setHover(null) : undefined}
          onClick={interactive ? () => onChange(position) : undefined}
        >
          {renderIcon(position)}
        </span>
      ))}
    </div>
  )
}
