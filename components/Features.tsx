import { Bookmark, Hash, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning-fast publish",
    description:
      "A focused editor — prompt body, one tag, done. No noise between you and going live.",
  },
  {
    icon: Hash,
    title: "Smart tagging",
    description:
      "Organize with #product, #writing, #dev, or any niche so the right people find your work.",
  },
  {
    icon: Bookmark,
    title: "Copy-ready cards",
    description:
      "Every prompt is one tap away from your clipboard. Paste straight into any AI tool you use.",
  },
  {
    icon: Shield,
    title: "Your own space",
    description:
      "A personal profile with edit and delete controls. You own what you publish, always.",
  },
]

const Features = () => {
  return (
    <section className="features_section page_container py-20 md:py-24">
      <div className="features_panel">
        <div className="section_header text-left md:max-w-md">
          <p className="section_label">Why creators choose GoPrompt</p>
          <h2 className="section_title text-left">
            Built for people who live in AI tools
          </h2>
          <p className="section_subtitle mt-4 text-left">
            Whether you&apos;re a marketer, developer, or designer — save hours
            every week with a library that actually stays organized.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
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
      </div>
    </section>
  )
}

export default Features
