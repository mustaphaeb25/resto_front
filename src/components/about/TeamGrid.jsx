import FadeIn from '../ui/FadeIn'
import SubHeading from '../ui/SubHeading'
import { team } from '../../data/team'

export default function TeamGrid() {
  return (
    <section className="py-10">
      <div>
        <div className="text-center mb-9">
          <SubHeading>MEET THE TEAM</SubHeading>
          <h3 className="font-serif text-[1.7rem] sm:text-[2rem]">The Hearts Behind Saffron House</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
          {team.map((member) => (
            <FadeIn key={member.id}>
              <div className="bg-white rounded-2xl overflow-hidden border border-border hover:-translate-y-1 transition-transform duration-300">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h4 className="font-serif text-[1.2rem] mb-1">{member.name}</h4>
                  <span className="text-[0.8rem] text-gold font-semibold uppercase tracking-[1px] block mb-3">
                    {member.role}
                  </span>
                  <p className="text-[0.8rem] text-text-muted leading-[1.6]">{member.bio}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
