import {
  FaPhone,
  FaRegEnvelope,
  FaRegClock,
  FaUtensils,
  FaInstagram,
  FaFacebookF,
  FaTripadvisor,
  FaWhatsapp,
} from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { contactInfo } from '../../data/contactInfo'

const infoItems = [
  { icon: <FaLocationDot />, label: 'Address', value: contactInfo.address },
  { icon: <FaPhone />, label: 'Phone', value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s/g, '')}` },
  { icon: <FaRegEnvelope />, label: 'Email', value: contactInfo.email, href: `mailto:${contactInfo.email}` },
  { icon: <FaRegClock />, label: 'Reception Hours', value: contactInfo.receptionHours },
  { icon: <FaUtensils />, label: 'Restaurant Hours', value: contactInfo.restaurantHours.join(' | ') },
]

const socialLinks = [
  { icon: <FaInstagram />, href: contactInfo.social.instagram, label: 'Instagram' },
  { icon: <FaFacebookF />, href: contactInfo.social.facebook, label: 'Facebook' },
  { icon: <FaTripadvisor />, href: contactInfo.social.tripadvisor, label: 'TripAdvisor' },
  { icon: <FaWhatsapp />, href: contactInfo.social.whatsapp, label: 'WhatsApp' },
]

export default function ContactInfo() {
  return (
    <div className="bg-dark-green text-white rounded-2xl p-6 sm:p-9 h-full">
      <h3 className="font-serif text-[1.6rem] mb-6">Contact Information</h3>

      {infoItems.map((item, index) => (
        <div key={index} className="flex gap-3.5 mb-5">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-gold flex-shrink-0">
            {item.icon}
          </div>
          <div>
            <h5 className="text-[0.8rem] text-gold uppercase tracking-wide mb-1">{item.label}</h5>
            {item.href ? (
              <a href={item.href} className="text-[0.85rem] text-[#C0C8C4] hover:text-white transition-colors no-underline">
                {item.value}
              </a>
            ) : (
              <p className="text-[0.85rem] text-[#C0C8C4]">{item.value}</p>
            )}
          </div>
        </div>
      ))}

      <div className="mt-6 rounded-xl overflow-hidden h-[160px]">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
          alt="Map Location"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex gap-3 mt-6">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-gold hover:border-gold transition-all duration-300"
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  )
}
