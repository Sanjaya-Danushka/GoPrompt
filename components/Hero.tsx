"use client"

import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { ArrowRight, Bot, Copy, Users } from "lucide-react"
import { useEffect, useState } from "react"

const Hero = () => {
  const { data: session } = useSession()
  const [promptCount, setPromptCount] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/prompt")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPromptCount(data.length)
      })
      .catch(() => {})
  }, [])

  return (
    <section className="hero_section w-full overflow-hidden">
      <div className="hero_glow" aria-hidden />

      <p className="section_label">AI prompt library · Open & free</p>

      <h1 className="hero_title text-center">
        Your next great prompt
        <br />
        <span className="hero_gradient">starts here.</span>
      </h1>

      <p className="hero_desc">
        Publish prompts for ChatGPT, Claude, Gemini, and more. Browse what top
        creators use daily — copy in one click and ship faster.
      </p>

      <div className="hero_actions">
        {session?.user ? (
          <>
            <Link href="/create-prompt" className="hero_btn_primary">
              Publish a prompt
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/feed" className="hero_btn_secondary">
              View the feed
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => signIn()}
              className="hero_btn_primary"
            >
              Join free with Google
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/feed" className="hero_btn_secondary">
              Browse the feed
            </Link>
          </>
        )}
      </div>

      <div className="hero_stats">
        <div className="hero_stat">
          <Bot className="h-5 w-5 text-violet-600" />
          <div>
            <p className="hero_stat_value">
              {promptCount !== null ? `${promptCount}+` : "—"}
            </p>
            <p className="hero_stat_label">Live prompts</p>
          </div>
        </div>
        <div className="hero_stat_divider" />
        <div className="hero_stat">
          <Copy className="h-5 w-5 text-fuchsia-600" />
          <div>
            <p className="hero_stat_value">1-click</p>
            <p className="hero_stat_label">Copy to clipboard</p>
          </div>
        </div>
        <div className="hero_stat_divider" />
        <div className="hero_stat">
          <Users className="h-5 w-5 text-orange-500" />
          <div>
            <p className="hero_stat_value">Open</p>
            <p className="hero_stat_label">Community driven</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
