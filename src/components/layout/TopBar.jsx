import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <div className="bg-white border-b border-border text-[0.75rem] py-2 text-text-muted">
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
        <span>Complimentary breakfast for in-house guests &bull; Book Direct for Exclusive Benefits</span>
        <Link to="/stay" className="font-bold text-text-dark tracking-wide hover:text-gold transition-colors">BOOK DIRECT</Link>
      </div>
    </div>
  )
}
