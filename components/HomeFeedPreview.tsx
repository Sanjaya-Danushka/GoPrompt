"use client"

import { Suspense } from "react"
import Link from "next/link"
import Feed from "@components/Feed"
import { ArrowRight } from "lucide-react"

const HomeFeedPreview = () => {
  return (
    <section className="page_container border-t border-gray-200/60 py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="section_label">Latest prompts</p>
          <h2 className="section_title mt-2">Fresh from the community</h2>
          <p className="section_subtitle mt-3 max-w-xl">
            A quick look at what&apos;s new. Open the full feed to search, filter
            by tag, and browse everything.
          </p>
        </div>
        <Link href="/feed" className="hero_btn_secondary shrink-0">
          View full feed
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <Suspense fallback={<p className="text-gray-500">Loading prompts…</p>}>
        <Feed showHeader={false} limit={6} />
      </Suspense>
    </section>
  )
}

export default HomeFeedPreview
