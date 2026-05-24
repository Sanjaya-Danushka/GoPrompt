import Features from "@components/Features"
import Feed from "@components/Feed"
import Hero from "@components/Hero"

const Home = () => {
  return (
    <div className="flex w-full flex-col">
      <Hero />
      <Features />
      <Feed />
    </div>
  )
}

export default Home
