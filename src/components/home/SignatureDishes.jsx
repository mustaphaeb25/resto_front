import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'
import SectionHeader from '../ui/SectionHeader'
import ReviewWidget from '../ui/ReviewWidget'

export default function SignatureDishes() {
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    api.getMenuItems().then((items) => setDishes(items.slice(0, 5))).catch(console.error)
  }, [])

  return (
    <section>
      <FadeIn>
        <SubHeading>SIGNATURE DISHES</SubHeading>
      </FadeIn>
      <SectionHeader
        title="Crafted with Passion, Served with Elegance"
        linkTo="/dine"
        linkText="VIEW FULL MENU"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {dishes.map((dish, i) => (
          <FadeIn key={dish.id} delay={i * 80} className="bg-card rounded-xl p-3 hover:-translate-y-1 transition-transform duration-300">
            <div className="h-[140px] rounded-lg overflow-hidden mb-3">
              <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-serif text-[0.95rem] truncate mb-1">{dish.name}</h4>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[0.85rem] font-semibold text-[#7A6955]">${dish.price}</span>
              <ReviewWidget target="DISH" itemId={dish.id} itemName={dish.name} size="text-[0.7rem]" />
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
