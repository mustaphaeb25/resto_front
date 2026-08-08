import { Link } from 'react-router-dom'
import FadeIn from '../ui/FadeIn'

export default function CTABanner() {
  return (
    <FadeIn>
      <section className="py-10">
        <div>
          <div className="bg-dark-green rounded-2xl p-6 sm:p-12 text-center text-white">
            <h3 className="font-serif text-[1.6rem] sm:text-[2rem] font-normal mb-3">
              Experience Saffron House for Yourself
            </h3>
            <p className="text-[#C0C8C4] text-[0.9rem] mb-6 max-w-xl mx-auto">
              Book your stay or reserve a table and discover why guests return year after year to
              this timeless haven on the shores of Lake Pichola.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <Link
                to="/stay"
                className="inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-[0.85rem] font-semibold transition-all duration-300 bg-gold text-dark-green hover:bg-gold-hover border border-transparent cursor-pointer"
              >
                BOOK A ROOM
              </Link>
              <Link
                to="/dine#table-reservation"
                className="inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-[0.85rem] font-semibold transition-all duration-300 text-white border border-white/30 bg-transparent hover:bg-white/10 cursor-pointer"
              >
                RESERVE A TABLE
              </Link>
            </div>
          </div>
        </div>
      </section>
    </FadeIn>
  )
}
