import PageBanner from '../components/layout/PageBanner'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import FAQAccordion from '../components/contact/FAQAccordion'
import FadeIn from '../components/ui/FadeIn'

export default function Contact() {
  return (
    <div>
      <PageBanner
        subtitle="GET IN TOUCH"
        title="We'd Love to Hear From You"
        description="Whether you have a question about reservations, events, or simply want to say hello — our doors and hearts are always open."
        image="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80"
      />

      <section className="py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <FadeIn direction="left">
            <ContactForm />
          </FadeIn>
          <FadeIn direction="right">
            <ContactInfo />
          </FadeIn>
        </div>
      </section>

      <FadeIn>
        <FAQAccordion />
      </FadeIn>
    </div>
  )
}
