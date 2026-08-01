import { useState, useEffect } from 'react'
import { FaSpa, FaPersonSwimming, FaBellConcierge, FaUtensils } from 'react-icons/fa6'
import PageBanner from '../components/layout/PageBanner'
import SearchBar from '../components/stay/SearchBar'
import RoomCard from '../components/stay/RoomCard'
import RoomBookingModal from '../components/stay/RoomBookingModal'
import FilterTabs from '../components/ui/FilterTabs'
import FadeIn from '../components/ui/FadeIn'
import SubHeading from '../components/ui/SubHeading'
import { api } from '../services/api'
import { amenities } from '../data/amenities'

const tabs = [
  { label: 'All Accommodations', value: 'all' },
  { label: 'Deluxe Rooms', value: 'room' },
  { label: 'Executive Suites', value: 'suite' },
  { label: 'Royal Villas', value: 'villa' },
]

const iconMap = {
  spa: FaSpa,
  pool: FaPersonSwimming,
  concierge: FaBellConcierge,
  utensils: FaUtensils,
}

export default function Stay() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ checkIn: '', checkOut: '', guests: '2 Adults', category: 'all' })
  const [bookingRoom, setBookingRoom] = useState(null)

  useEffect(() => {
    api.getRooms()
      .then(setRooms)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const activeTab = filters.category
  const filtered = activeTab === 'all' ? rooms : rooms.filter((r) => r.category === activeTab)

  const handleSearch = (data) => {
    setFilters(data)
  }

  const handleTabChange = (tab) => {
    setFilters((prev) => ({ ...prev, category: tab }))
  }

  return (
    <div>
      <PageBanner
        subtitle="LUXURY ACCOMMODATION"
        title="Stay With Us"
        description="Discover our collection of beautifully appointed rooms, suites, and villas."
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80"
      />

      <div className="py-12">
        <SearchBar onSearch={handleSearch} category={filters.category} />

        <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />

        {loading ? (
          <div className="text-center py-12 text-text-muted">Loading rooms...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {filtered.map((room, i) => (
              <FadeIn key={room.id} delay={i * 100}>
                <RoomCard room={room} onBook={setBookingRoom} />
              </FadeIn>
            ))}
          </div>
        )}

        <RoomBookingModal room={bookingRoom} isOpen={!!bookingRoom} onClose={() => setBookingRoom(null)} />

        <div className="bg-card rounded-2xl p-12 mb-16">
          <div className="text-center">
            <SubHeading>GUEST PRIVILEGES</SubHeading>
            <h3 className="font-serif text-2xl">Boutique Hotel Amenities</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {amenities.map((a) => {
              const Icon = iconMap[a.icon]
              return (
                <div
                  key={a.id}
                  className="bg-white p-6 rounded-xl border border-border text-center hover:-translate-y-1 transition-transform duration-300"
                >
                  <Icon className="text-[2rem] text-gold mb-3" />
                  <h4 className="font-serif text-[1.1rem] mb-1">{a.title}</h4>
                  <p className="text-[0.8rem] text-text-muted">{a.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
