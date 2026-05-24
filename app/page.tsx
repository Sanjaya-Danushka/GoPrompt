import CtaBanner from "@components/CtaBanner"
import Features from "@components/Features"
import Hero from "@components/Hero"
import HomeFeedPreview from "@components/HomeFeedPreview"
import HowItWorks from "@components/HowItWorks"

const Home = () => {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <HowItWorks />
      <Features />
      <CtaBanner />
      <HomeFeedPreview />
    </div>
  )
}

export default Home
