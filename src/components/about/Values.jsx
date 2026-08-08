import { FaLandmark, FaUtensils, FaHeart } from 'react-icons/fa'
import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'

const values = [
  {
    icon: <FaLandmark />,
    title: 'Heritage',
    description:
      'We honour the centuries-old traditions of Rajasthani culture, preserving the architecture, art, and rituals that make Udaipur extraordinary.',
  },
  {
    icon: <FaUtensils />,
    title: 'Culinary Excellence',
    description:
      'Our kitchen celebrates bold Rajasthani flavours alongside global techniques, crafting dishes that surprise and delight with every bite.',
  },
  {
    icon: <FaHeart />,
    title: 'Warm Hospitality',
    description:
      'From the first greeting to the final farewell, every interaction is infused with genuine care, making you feel at home from the moment you arrive.',
  },
]

export default function Values() {
  return (
    <section className="bg-card py-16">
      <div>
        <div className="text-center mb-9">
          <SubHeading>OUR PHILOSOPHY</SubHeading>
          <h3 className="font-serif text-[1.7rem] sm:text-[2rem]">What We Stand For</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {values.map((value, index) => (
            <FadeIn key={index}>
              <div className="bg-card rounded-2xl p-8 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="w-[60px] h-[60px] rounded-full bg-dark-green text-gold text-[1.5rem] flex items-center justify-center mx-auto mb-4">
                  {value.icon}
                </div>
                <h4 className="font-serif text-[1.2rem] mb-2">{value.title}</h4>
                <p className="text-[0.85rem] text-text-muted leading-[1.6]">{value.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
