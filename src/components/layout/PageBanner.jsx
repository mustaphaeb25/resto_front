export default function PageBanner({ subtitle, title, description, image }) {
  return (
    <div
      className="relative h-[320px] rounded-2xl overflow-hidden flex items-center justify-center text-center text-white my-6 bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.7) 100%), url(${image})` }}
    >
      <div className="relative z-[2]">
        <span className="block mb-2 text-[0.75rem] font-bold uppercase tracking-[2px] text-gold">{subtitle}</span>
        <h2 className="font-serif text-[3rem] font-normal mb-2">{title}</h2>
        <p className="text-[1rem] text-[#E0E0E0]">{description}</p>
      </div>
    </div>
  )
}
