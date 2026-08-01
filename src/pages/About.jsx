import PageBanner from '../components/layout/PageBanner'
import StorySection from '../components/about/StorySection'
import Values from '../components/about/Values'
import TeamGrid from '../components/about/TeamGrid'
import CTABanner from '../components/about/CTABanner'

export default function About() {
  return (
    <div>
      <PageBanner
        subtitle="OUR STORY"
        title="Where Heritage Meets Hospitality"
        description="Discover the soul of Saffron House — a story of passion, tradition, and the art of making every guest feel extraordinary."
        image="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80"
      />
      <StorySection />
      <Values />
      <TeamGrid />
      <CTABanner />
    </div>
  )
}
