import { PenLine, Search, Share2 } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Find what works",
    description:
      "Filter by tag, topic, or creator. Skip the trial-and-error and start with prompts that already deliver results.",
  },
  {
    step: "02",
    icon: PenLine,
    title: "Write & tag yours",
    description:
      "Drop in your best system prompts, add a hashtag like #seo or #coding, and hit publish in under a minute.",
  },
  {
    step: "03",
    icon: Share2,
    title: "Grow your profile",
    description:
      "Your public profile becomes a portfolio. Others copy your work — you build reputation as an AI power user.",
  },
]

const HowItWorks = () => {
  return (
    <section className="page_container py-20 md:py-28">
      <div className="section_header">
        <p className="section_label">How it works</p>
        <h2 className="section_title">
          Three steps to go from scroll to publish
        </h2>
        <p className="section_subtitle mx-auto">
          No complicated setup. Sign in, share a prompt, and you&apos;re part of
          the community.
        </p>
      </div>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {steps.map(({ step, icon: Icon, title, description }) => (
          <article key={step} className="step_card">
            <span className="step_number">{step}</span>
            <div className="feature_icon mt-6">
              <Icon className="h-5 w-5 text-violet-600" />
            </div>
            <h3 className="mt-5 font-satoshi text-xl font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HowItWorks
