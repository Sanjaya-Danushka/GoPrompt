"use client"

import Link from "next/link"
import { signIn, useSession } from "next-auth/react"
import { ArrowRight } from "lucide-react"

const CtaBanner = () => {
  const { data: session } = useSession()

  return (
    <section className="page_container pb-8">
      <div className="cta_banner">
        <div className="relative z-10 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-200">
            Ready when you are
          </p>
          <h2 className="mt-3 font-satoshi text-2xl font-bold text-white md:text-3xl">
            {session?.user
              ? "Got a prompt that crushed it? Share it today."
              : "Stop rewriting the same prompt from scratch."}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-violet-100/90 md:text-base">
            {session?.user
              ? "Your next post could save someone hours. It only takes a minute to publish."
              : "Join thousands of creators building a free, open library of AI prompts."}
          </p>
        </div>

        {session?.user ? (
          <Link href="/create-prompt" className="cta_btn">
            Create now
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <button type="button" onClick={() => signIn()} className="cta_btn">
            Get started
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </section>
  )
}

export default CtaBanner
