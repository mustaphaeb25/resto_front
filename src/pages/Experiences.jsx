import { useState, useEffect } from 'react'
import PageBanner from '../components/layout/PageBanner'
import ExperienceCard from '../components/experiences/ExperienceCard'
import FilterTabs from '../components/ui/FilterTabs'
import FadeIn from '../components/ui/FadeIn'
import { api } from '../services/api'

const tabs = [
  { label: 'All Experiences', value: 'all' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Culinary', value: 'culinary' },
  { label: 'Cultural', value: 'cultural' },
]

export default function Experiences() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    api.getExperiences()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = activeTab === 'all' ? experiences : experiences.filter((e) => e.category === activeTab)

  return (
    <div>
      <PageBanner
        subtitle="CURATED EXPERIENCES"
        title="Beyond the Ordinary"
        description="Immerse yourself in unforgettable moments curated just for you."
        image="/Neemrana%20fort.jpeg"
      />

      <div className="py-12">
        <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {loading ? (
          <div className="text-center py-12 text-text-muted">Loading experiences...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-16">
            {filtered.map((exp, i) => (
              <FadeIn key={exp.id} delay={i * 100}>
                <ExperienceCard experience={exp} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
