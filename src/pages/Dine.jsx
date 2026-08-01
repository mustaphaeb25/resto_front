import { useState, useEffect } from 'react'
import PageBanner from '../components/layout/PageBanner'
import MenuItemCard from '../components/dine/MenuItemCard'
import ReservationSection from '../components/dine/ReservationSection'
import FilterTabs from '../components/ui/FilterTabs'
import FadeIn from '../components/ui/FadeIn'
import { api } from '../services/api'

const tabs = [
  { label: 'All Dishes', value: 'all' },
  { label: 'Starters', value: 'starter' },
  { label: 'Main Courses', value: 'mains' },
  { label: 'Desserts', value: 'dessert' },
  { label: 'Cocktails & Wine', value: 'drinks' },
]

export default function Dine() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    api.getMenuItems()
      .then(setMenuItems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeTab === 'all' ? menuItems : menuItems.filter((i) => i.category === activeTab)

  return (
    <div>
      <PageBanner
        subtitle="FINE DINING EXPERIENCE"
        title="Culinary Excellence"
        description="A journey of flavors crafted by our award-winning chefs."
        image="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80"
      />

      <div className="py-12">
        <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {loading ? (
          <div className="text-center py-12 text-text-muted">Loading menu...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {filtered.map((item, i) => (
              <FadeIn key={item.id} delay={i * 80}>
                <MenuItemCard item={item} />
              </FadeIn>
            ))}
          </div>
        )}

        <ReservationSection />
      </div>
    </div>
  )
}
