import { useState, useEffect } from 'react'
import PageBanner from '../components/layout/PageBanner'
import FilterTabs from '../components/ui/FilterTabs'
import FadeIn from '../components/ui/FadeIn'
import Lightbox from '../components/ui/Lightbox'
import { api } from '../services/api'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Rooms', value: 'rooms' },
  { label: 'Dining', value: 'dining' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Events', value: 'events' },
]

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    api.getGallery()
      .then(setGalleryItems)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filteredItems =
    activeTab === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab)

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div>
      <PageBanner
        subtitle="VISUAL JOURNEY"
        title="Moments at Saffron House"
        description="A glimpse into the elegance, warmth, and beauty that define every corner of our heritage property."
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-10">
        <div>
          <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

          {loading ? (
            <div className="text-center py-12 text-text-muted">Loading gallery...</div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {filteredItems.map((item, index) => (
                <FadeIn key={item.id}>
                  <div
                    className="break-inside-avoid mb-4 rounded-xl overflow-hidden relative cursor-pointer"
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full block hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:opacity-0 sm:hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                      <span className="text-white text-[0.8rem] sm:text-[0.85rem] font-semibold">{item.label}</span>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      <Lightbox
        images={filteredItems.map((item) => item.image)}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  )
}
