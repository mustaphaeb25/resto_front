import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

export default function SectionHeader({ title, linkTo, linkText = 'VIEW ALL', className = '' }) {
  return (
    <div className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6 ${className}`}>
      <h3 className="font-serif text-[1.5rem] sm:text-[1.8rem] font-medium leading-tight">{title}</h3>
      {linkTo && (
        <Link to={linkTo} className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-text-dark hover:text-gold transition-colors whitespace-nowrap">
          {linkText} <FaArrowRight className="text-xs" />
        </Link>
      )}
    </div>
  )
}
