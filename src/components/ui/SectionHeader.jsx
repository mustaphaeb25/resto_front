import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'

export default function SectionHeader({ title, linkTo, linkText = 'VIEW ALL', className = '' }) {
  return (
    <div className={`flex items-end justify-between mb-6 ${className}`}>
      <h3 className="font-serif text-[1.8rem] font-medium">{title}</h3>
      {linkTo && (
        <Link to={linkTo} className="flex items-center gap-1.5 text-[0.8rem] font-semibold text-text-dark hover:text-gold transition-colors">
          {linkText} <FaArrowRight className="text-xs" />
        </Link>
      )}
    </div>
  )
}
