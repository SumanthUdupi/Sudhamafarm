import HeroSection from '@/components/home/HeroSection'
import HomeFeatureCards from '@/components/home/HomeFeatureCards'
import FarmhouseSection from '@/components/home/FarmhouseSection'
import FarmProductsSection from '@/components/home/FarmProductsSection'
import CowsSection from '@/components/home/CowsSection'
import StorySection from '@/components/home/StorySection'
import LocationSection from '@/components/home/LocationSection'

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
    </>
  )
}
