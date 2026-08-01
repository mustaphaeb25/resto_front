import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'

export default function StorySection() {
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <FadeIn direction="left">
          <SubHeading>SINCE 1998</SubHeading>
          <h3 className="font-serif text-[2rem] mb-6">A Legacy of Timeless Hospitality</h3>
          <p className="text-[0.9rem] text-text-muted leading-[1.8] mb-4">
            Nestled in the heart of Udaipur, Saffron House began as a restored 18th-century haveli
            where the Sharma family welcomed weary travellers with warm chai and heartfelt stories.
            What started as a humble gesture of hospitality soon blossomed into one of Rajasthan's
            most cherished boutique hotels.
          </p>
          <p className="text-[0.9rem] text-text-muted leading-[1.8] mb-4">
            Over the decades, we have meticulously preserved the intricate frescoed ceilings, hand-carved
            marble balconies, and tranquil courtyards that make our property a living museum of
            Rajasthani craftsmanship. Every wall tells a tale, every corner holds a memory.
          </p>
          <p className="text-[0.9rem] text-text-muted leading-[1.8]">
            Today, Saffron House stands as a bridge between the grandeur of the past and the comfort
            of the present — a place where heritage is not just observed, but experienced with all
            the senses.
          </p>
        </FadeIn>

        <FadeIn direction="right">
          <div className="rounded-2xl overflow-hidden h-[400px]">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
              alt="Saffron House Heritage"
              className="w-full h-full object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
