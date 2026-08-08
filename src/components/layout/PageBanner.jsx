export default function PageBanner({ subtitle, title, description, image }) {
  return (
    <div
      className="relative min-h-[260px] sm:min-h-[320px] rounded-2xl overflow-hidden flex items-center justify-center text-center text-white my-6 bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 100%), url(${image})` }}
    >
      <div className="relative z-[2] px-5 py-10 sm:px-10">
        <span className="block mb-2 text-[0.7rem] sm:text-[0.75rem] font-bold uppercase tracking-[2px] text-gold">{subtitle}</span>
        <h2 className="font-serif text-[1.9rem] sm:text-[2.4rem] md:text-[3rem] font-normal mb-2">{title}</h2>
        <p className="text-[0.9rem] sm:text-[1rem] text-[#E0E0E0] max-w-2xl mx-auto">{description}</p>
      </div>
    </div>
  )
}
