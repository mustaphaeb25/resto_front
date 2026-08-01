import { useState, useEffect } from 'react'
import { api } from '../../services/api'
import SubHeading from '../ui/SubHeading'
import Button from '../ui/Button'

export default function ChefSpecial() {
  const [seaBass, setSeaBass] = useState(null)

  useEffect(() => {
    api.getMenuItems().then((items) => {
      const found = items.find((item) => item.id === 5)
      if (found) setSeaBass(found)
    }).catch(console.error)
  }, [])

  if (!seaBass) return null

  return (
    <div className="bg-dark-green rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 text-white h-full">
      <div className="p-9 flex flex-col justify-center">
        <SubHeading className="text-gold">CHEF&apos;S SPECIAL</SubHeading>
        <h3 className="font-serif text-[1.8rem] mb-3">{seaBass.name}</h3>
        <p className="text-[#C0C8C4] text-[0.85rem] mb-5 leading-relaxed">
          {seaBass.description}
        </p>
        <span className="text-[1.2rem] font-semibold mb-6">${seaBass.price}</span>
        <div>
          <Button to="/dine" variant="outline" className="border-white/30 text-white hover:border-white">
            EXPLORE MENU
          </Button>
        </div>
      </div>
      <div className="h-full min-h-[300px]">
        <img src={seaBass.image} alt={seaBass.name} className="w-full h-full object-cover" />
      </div>
    </div>
  )
}
