export default function SubHeading({ children, className = '' }) {
  return (
    <span className={`block mb-2 text-[0.75rem] font-bold uppercase tracking-[2px] text-[#8C7B68] ${className}`}>
      {children}
    </span>
  )
}
