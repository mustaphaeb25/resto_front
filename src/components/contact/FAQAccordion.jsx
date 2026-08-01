import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'
import { faq } from '../../data/faq'

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="bg-card py-16">
      <div>
        <div className="text-center mb-9">
          <SubHeading>FREQUENTLY ASKED</SubHeading>
          <h3 className="font-serif text-[2rem]">Common Questions</h3>
        </div>

        <div className="max-w-[800px] mx-auto">
          {faq.map((item, index) => (
            <FadeIn key={item.id}>
              <div className="border border-border rounded-xl mb-3 overflow-hidden bg-white">
                <button
                  onClick={() => toggle(index)}
                  className="w-full py-4 px-5 bg-transparent border-none text-left text-[0.9rem] font-semibold cursor-pointer flex justify-between items-center font-sans hover:text-gold transition-colors"
                >
                  {item.question}
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180 text-gold' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-[200px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-4 text-[0.85rem] text-text-muted leading-[1.7]">
                    {item.answer}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
