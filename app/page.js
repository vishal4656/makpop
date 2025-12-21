import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import WhyMakpop from '@/components/home/WhyMakpop'
import UsageOccasions from '@/components/home/UsageOccasions'
import CustomerTrust from '@/components/home/CustomerTrust'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyMakpop />
      <UsageOccasions />
      <CustomerTrust />
    </>
  )
}
