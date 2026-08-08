import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-dark-green text-white hover:bg-dark-green-hover',
  secondary: 'bg-white text-text-dark border border-border hover:bg-card',
  outline: 'border border-border text-text-dark bg-transparent hover:bg-dark-green hover:text-white hover:border-dark-green',
}

export default function Button({ children, variant = 'primary', to, href, className = '', disabled, ...props }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 min-h-11 text-[0.85rem] font-semibold transition-all duration-300 border border-transparent'
  const stateClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
  const classes = `${base} ${stateClasses} ${variants[variant]} ${className}`

  if (to) return <Link to={to} className={classes} {...props}>{children}</Link>
  if (href) return <a href={href} className={classes} {...props}>{children}</a>
  return <button className={classes} disabled={disabled} {...props}>{children}</button>
}
