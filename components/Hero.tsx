"use client"

import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { ArrowRight, Sparkles } from "lucide-react"

const Hero = () => {
  const { data: session } = useSession()

  return (
    <section className="hero_section w-full">
      <div className="hero_badge">
        <Sparkles className="h-4 w-4 text-violet-600" />
        <span>Open-source AI prompt platform</span>
      </div>

      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="hero_gradient"> Creative AI Prompts</span>
      </h1>

      <p className="desc mx-auto text-center">
        GoPrompt helps you explore powerful prompts, publish your own ideas, and
        connect with creators building the future of AI workflows.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        {session?.user ? (
          <>
            <Link href="/create-prompt" className="hero_btn_primary">
              Create a prompt
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#prompts" className="hero_btn_secondary">
              Browse community
            </Link>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => signIn()}
              className="hero_btn_primary"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="#prompts" className="hero_btn_secondary">
              Explore prompts
            </Link>
          </>
        )}
      </div>
    </section>
  )
}

export default Hero
