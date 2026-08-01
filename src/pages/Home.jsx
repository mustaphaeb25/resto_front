import Hero from '../components/home/Hero'
import SignatureDishes from '../components/home/SignatureDishes'
import ChefSpecial from '../components/home/ChefSpecial'
import TestimonialSlider from '../components/home/TestimonialSlider'
import PromoGrid from '../components/home/PromoGrid'
import GalleryPreview from '../components/home/GalleryPreview'
import ReservationContact from '../components/home/ReservationContact'

export default function Home() {
  return (
    <>
      <section className="pt-6 pb-12">
        <Hero />
      </section>
      <section className="py-10">
        <SignatureDishes />
      </section>
      <section className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <ChefSpecial />
          <TestimonialSlider />
        </div>
      </section>
      <section className="py-10">
        <PromoGrid />
      </section>
      <section className="py-10">
        <GalleryPreview />
      </section>
      <section className="py-10">
        <ReservationContact />
      </section>
    </>
  )
}
