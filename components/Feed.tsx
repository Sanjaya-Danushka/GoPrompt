"use client"

import { useState, useEffect, useMemo } from "react"
import PromptCard from "@components/promptCard"
import { Search } from "lucide-react"

interface Creator {
  _id: string
  username: string
  email: string
  image: string
}

interface Post {
  _id: string
  prompt: string
  tag: string
  creator: Creator
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const filteredPosts = useMemo(() => {
    const query = searchText.trim().toLowerCase()
    if (!query) return posts

    return posts.filter(
      (post) =>
        post.prompt.toLowerCase().includes(query) ||
        post.tag.toLowerCase().includes(query) ||
        post.creator.username.toLowerCase().includes(query)
    )
  }, [posts, searchText])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt")
        if (!response.ok) return
        const data = await response.json()
        if (Array.isArray(data)) setPosts(data)
      } catch (error) {
        console.error("Failed to fetch posts:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  return (
    <section id="prompts" className="app w-full pb-20 pt-4">
      <div className="feed_header">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600">
            Community
          </p>
          <h2 className="mt-2 font-satoshi text-3xl font-bold text-gray-900 md:text-4xl">
            Trending prompts
          </h2>
          <p className="mt-3 max-w-xl text-gray-600">
            Explore what creators are sharing right now. Copy, remix, and save
            your favorites.
          </p>
        </div>
        <p className="feed_count">
          {loading ? "Loading..." : `${filteredPosts.length} prompts`}
        </p>
      </div>

      <form className="relative mt-10 w-full max-w-2xl">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by tag, prompt, or username..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search_input pl-12"
        />
      </form>

      {loading ? (
        <div className="prompt_layout mt-10">
          {[1, 2, 3].map((i) => (
            <div key={i} className="prompt_card animate-pulse">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-full rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="prompt_layout mt-10 w-full">
          {filteredPosts.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={(tag) => setSearchText(tag.replace("#", ""))}
            />
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-gray-500">
          No prompts found. Try a different search or be the first to create one.
        </p>
      )}
    </section>
  )
}

export default Feed
