import { FaMaximize, FaBed, FaUser } from 'react-icons/fa6'
import Button from '../ui/Button'
import ReviewWidget from '../ui/ReviewWidget'

export default function RoomCard({ room, onBook }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border shadow flex flex-col hover:-translate-y-1.5 transition-transform duration-300">
      <div className="h-[220px] overflow-hidden relative">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {room.badge && (
          <span className="absolute top-4 right-4 bg-dark-green text-white text-[0.7rem] font-bold px-2.5 py-1 rounded">
            {room.badge}
          </span>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
          <h3 className="font-serif text-[1.4rem] min-w-0">{room.name}</h3>
          <ReviewWidget target="ROOM" itemId={room.id} itemName={room.name} size="text-[0.8rem]" />
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.75rem] text-text-muted mb-3">
          <span className="flex items-center gap-1">
            <FaMaximize className="text-gold" /> {room.size}
          </span>
          <span className="flex items-center gap-1">
            <FaBed /> {room.bed}
          </span>
          <span className="flex items-center gap-1">
            <FaUser /> {room.maxGuests} Guests
          </span>
        </div>

        <p className="text-[0.85rem] text-text-muted mb-5" style={{ lineHeight: 1.6 }}>
          {room.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {room.features.map((f) => (
            <span key={f} className="bg-card border border-border text-[0.7rem] px-2.5 py-1 rounded">
              {f}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4 border-t border-border flex flex-wrap items-end justify-between gap-3">
          <div>
            <span className="text-[1.25rem] font-bold text-dark-green">${room.price}</span>
            <span className="text-[0.75rem] text-light font-normal"> / night</span>
          </div>
          <Button variant="outline" onClick={() => onBook(room)}>Book Room</Button>
        </div>
      </div>
    </div>
  )
}
