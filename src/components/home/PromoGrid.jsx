import { FaClock, FaFeather, FaUtensils } from 'react-icons/fa'
import { hours } from '../../data/hours'
import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'
import Button from '../ui/Button'

export default function PromoGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_0.9fr] gap-5">
      <FadeIn className="bg-card rounded-2xl overflow-hidden flex flex-col">
        <div className="p-7 flex-1">
          <SubHeading>STAY WITH US</SubHeading>
          <h3 className="font-serif text-[1.4rem] mb-2">Luxury Rooms Designed for You</h3>
          <p className="text-[0.85rem] text-text-muted leading-relaxed mb-5">
            Elegant rooms and suites with curated comfort and charming views.
          </p>
          <Button to="/stay" variant="outline">EXPLORE ROOMS <FaFeather /></Button>
        </div>
        <div className="h-[140px]">
          <img
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=600&q=80"
            alt="Luxury room"
            className="w-full h-full object-cover"
          />
        </div>
      </FadeIn>

      <FadeIn className="bg-card rounded-2xl overflow-hidden flex flex-col" delay={100}>
        <div className="p-7 flex-1">
          <SubHeading>DINE IN PRIVACY</SubHeading>
          <h3 className="font-serif text-[1.4rem] mb-2">In-Room Dining & Experiences</h3>
          <p className="text-[0.85rem] text-text-muted leading-relaxed mb-5">
            Enjoy our gourmet menu in the comfort and privacy of your room.
          </p>
          <Button to="/dine" variant="outline">VIEW DINING <FaUtensils /></Button>
        </div>
        <div className="h-[140px]">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
            alt="In-room dining"
            className="w-full h-full object-cover"
          />
        </div>
      </FadeIn>

      <FadeIn direction="right" className="bg-dark-green rounded-2xl p-7 text-white flex flex-col" delay={200}>
        <div className="flex items-center gap-2 mb-5">
          <FaClock className="text-gold" />
          <span className="text-gold text-[0.75rem] font-bold uppercase tracking-[2px]">OPENING HOURS</span>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {hours.map((h, i) => (
            <div key={i} className="flex items-center justify-between pb-3 border-b border-white/20 last:border-0">
              <span className="text-[0.85rem]">{h.meal}</span>
              <span className="text-[0.8rem] text-white/70">{h.time}</span>
            </div>
          ))}
        </div>
        <p className="font-script text-[1.3rem] text-gold/80 mt-5">
          We look forward to welcoming you.
        </p>
      </FadeIn>
    </div>
  )
}
