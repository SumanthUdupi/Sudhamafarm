import HeroSection from '@/components/home/HeroSection'
import HomeFeatureCards from '@/components/home/HomeFeatureCards'
import FarmhouseSection from '@/components/home/FarmhouseSection'
import FarmProductsSection from '@/components/home/FarmProductsSection'
import CowsSection from '@/components/home/CowsSection'
import StorySection from '@/components/home/StorySection'
import LocationSection from '@/components/home/LocationSection'
import FaqSection from '@/components/home/FaqSection'

export const revalidate = 0 // Always fresh in dev; use ISR in production via deployment config

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeFeatureCards />
      <FarmhouseSection />
      <FarmProductsSection />
      <CowsSection />
      <StorySection />
      <LocationSection />
      <FaqSection />
    </>
  )
}
