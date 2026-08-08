import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../services/api'
import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'

export default function GalleryPreview() {
  const [previewItems, setPreviewItems] = useState([])

  useEffect(() => {
    api.getGallery().then((items) => {
      setPreviewItems(items.slice(0, 5))
    }).catch(console.error)
  }, [])

  if (previewItems.length === 0) return null

  return (
    <section>
      <FadeIn>
        <SubHeading>GALLERY</SubHeading>
      </FadeIn>
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-3 mt-3">
        {previewItems.map((item, i) => (
          <FadeIn key={item.id} delay={i * 60}>
            <Link
              to="/gallery"
              className="block h-[90px] sm:h-[120px] rounded-xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </Link>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
