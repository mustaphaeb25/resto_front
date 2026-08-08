import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'
import Button from '../ui/Button'

export default function Hero() {
  return (
    <section className="relative h-[460px] sm:h-[520px] rounded-2xl overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
        alt="Saffron House"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
      <FadeIn className="relative z-10 flex flex-col justify-center h-full px-6 sm:px-10 md:px-16 max-w-[550px]">
        <SubHeading className="text-gold">A STAY TO REMEMBER</SubHeading>
        <h2 className="font-serif text-white text-[2.4rem] sm:text-[3rem] md:text-[3.5rem] leading-tight font-normal mb-4">
          Stay, Dine, Unwind
        </h2>
        <p className="text-[0.95rem] text-[#E0E0E0] font-light mb-8">
          Where timeless hospitality meets unforgettable flavors.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button to="/dine#table-reservation" variant="primary" className="w-full sm:w-auto">RESERVE A TABLE</Button>
          <Button to="/stay" variant="secondary" className="w-full sm:w-auto">VIEW ROOMS</Button>
        </div>
      </FadeIn>
    </section>
  )
}
