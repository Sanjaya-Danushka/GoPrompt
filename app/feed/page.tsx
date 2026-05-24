import { Suspense } from "react"
import Feed from "@components/Feed"

const FeedPage = () => {
  return (
    <div className="flex w-full flex-col">
      <Suspense
        fallback={
          <div className="page_container py-20">
            <p className="text-gray-500">Loading feed…</p>
          </div>
        }
      >
        <Feed showHeader />
      </Suspense>
    </div>
  )
}

export default FeedPage
