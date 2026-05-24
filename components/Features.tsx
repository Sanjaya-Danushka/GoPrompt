import { Layers, Search, Share2, Zap } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "Discover instantly",
    description:
      "Search prompts by tag or keyword and find inspiration in seconds.",
  },
  {
    icon: Zap,
    title: "Create in minutes",
    description:
      "Publish polished prompts with tags so others can reuse your best ideas.",
  },
  {
    icon: Share2,
    title: "Share with everyone",
    description:
      "Build your public profile and grow a library the community can learn from.",
  },
  {
    icon: Layers,
    title: "Organize by tags",
    description:
      "Keep prompts structured with hashtags for product, dev, design, and more.",
  },
]

const Features = () => {
  return (
    <section className="app w-full py-16 md:py-20">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
          Why GoPrompt
        </p>
        <h2 className="mt-3 font-satoshi text-3xl font-bold text-gray-900 md:text-4xl">
          Everything you need to ship faster
        </h2>
        <p className="desc mx-auto mt-4 text-center">
          A clean workflow from discovery to publishing — no clutter, just prompts
          that work.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map(({ icon: Icon, title, description }) => (
          <article key={title} className="feature_card">
            <div className="feature_icon">
              <Icon className="h-5 w-5 text-violet-600" />
            </div>
            <h3 className="mt-5 font-satoshi text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features
