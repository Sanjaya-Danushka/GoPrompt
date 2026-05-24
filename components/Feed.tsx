"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import PromptCard from "@components/promptCard"
import { Search, X } from "lucide-react"

interface Creator {
  _id: string
  username: string
  email: string
  image: string
}

export interface Post {
  _id: string
  prompt: string
  tag: string
  creator: Creator
}

function normalizeQuery(raw: string) {
  return raw.trim().toLowerCase().replace(/^[@#]/, "")
}

function postMatchesSearch(post: Post, raw: string) {
  const trimmed = raw.trim()
  if (!trimmed) return true

  const q = normalizeQuery(trimmed)
  const tag = post.tag?.toLowerCase().replace(/^#/, "") ?? ""
  const username = post.creator?.username?.toLowerCase() ?? ""
  const email = post.creator?.email?.toLowerCase() ?? ""
  const prompt = post.prompt?.toLowerCase() ?? ""

  if (trimmed.startsWith("#")) return tag.includes(q)
  if (trimmed.startsWith("@")) return username.includes(q) || email.includes(q)

  return (
    prompt.includes(q) ||
    tag.includes(q) ||
    username.includes(q) ||
    email.includes(q)
  )
}

interface FeedProps {
  showHeader?: boolean
  limit?: number
  showViewAllLink?: boolean
}

const Feed = ({
  showHeader = true,
  limit,
  showViewAllLink = false,
}: FeedProps) => {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") ?? searchParams.get("tag") ?? ""

  const [searchText, setSearchText] = useState(initialQuery)
  const [activeTag, setActiveTag] = useState<string | null>(
    searchParams.get("tag") ? normalizeQuery(searchParams.get("tag")!) : null
  )
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = searchParams.get("q")
    const tag = searchParams.get("tag")
    if (q) setSearchText(q)
    else if (tag) {
      setSearchText(tag.startsWith("#") ? tag : `#${tag}`)
      setActiveTag(normalizeQuery(tag))
    }
  }, [searchParams])

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

  const popularTags = useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((post) => {
      const tag = post.tag?.replace(/^#/, "").toLowerCase()
      if (tag) counts.set(tag, (counts.get(tag) ?? 0) + 1)
    })
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([tag]) => tag)
  }, [posts])

  const filteredPosts = useMemo(() => {
    let result = posts

    if (activeTag) {
      result = result.filter(
        (post) =>
          post.tag?.toLowerCase().replace(/^#/, "") === activeTag
      )
    }

    if (searchText.trim()) {
      result = result.filter((post) => postMatchesSearch(post, searchText))
    }

    return result
  }, [posts, searchText, activeTag])

  const displayedPosts = limit ? filteredPosts.slice(0, limit) : filteredPosts

  const clearFilters = useCallback(() => {
    setSearchText("")
    setActiveTag(null)
  }, [])

  const selectTag = (tag: string) => {
    const normalized = normalizeQuery(tag)
    setActiveTag(normalized)
    setSearchText(`#${normalized}`)
  }

  const hasFilters = Boolean(searchText.trim() || activeTag)

  return (
    <section
      id="prompts"
      className={showHeader ? "page_container pb-24 pt-8" : "w-full"}
    >
      {showHeader && (
        <div className="feed_header">
          <div>
          <p className="section_label text-violet-600">Prompt feed</p>
          <h2 className="section_title mt-2 text-gray-900">All community prompts</h2>
          <p className="section_subtitle mt-3 max-w-xl text-gray-600">
              Search by keyword, filter with tags, or find a creator by username.
              Every card is copy-ready for your AI tools.
            </p>
          </div>
          <p className="feed_count">
            {loading
              ? "Loading…"
              : `${filteredPosts.length} of ${posts.length} prompts`}
          </p>
        </div>
      )}

      <div className={showHeader ? "mt-10" : "mt-0"}>
        <div className="feed_search_box">
          <Search className="feed_search_icon" aria-hidden />
          <input
            type="text"
            placeholder="Search prompts, #tags, or @username…"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value)
              if (!e.target.value.trim().startsWith("#")) {
                setActiveTag(null)
              }
            }}
            className="feed_search_field"
          />
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="feed_clear_btn"
              aria-label="Clear filters"
            >
              <X className="h-4 w-4 text-gray-600" />
              Clear
            </button>
          )}
        </div>

        {!limit && popularTags.length > 0 && (
          <div className="feed_tags_row">
            <span className="feed_tags_label">Popular:</span>
            {popularTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => selectTag(tag)}
                className={`tag_pill ${activeTag === tag ? "tag_pill_active" : ""}`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}

        {hasFilters && !loading && (
          <p className="mt-3 text-sm text-gray-500">
            Showing {filteredPosts.length} result
            {filteredPosts.length !== 1 ? "s" : ""}
            {activeTag ? ` for #${activeTag}` : ""}
            {searchText.trim() && !activeTag ? ` matching "${searchText}"` : ""}
          </p>
        )}
      </div>

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
      ) : displayedPosts.length > 0 ? (
        <>
          <div className="prompt_layout mt-10 w-full">
            {displayedPosts.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={(tag) => selectTag(tag)}
              />
            ))}
          </div>
          {showViewAllLink && posts.length > (limit ?? 0) && (
            <div className="mt-12 flex justify-center">
              <Link href="/feed" className="hero_btn_primary">
                View all {posts.length} prompts
              </Link>
            </div>
          )}
        </>
      ) : (
        <div className="empty_feed">
          <p className="font-satoshi text-lg font-semibold text-gray-800">
            {posts.length === 0
              ? "No prompts yet"
              : "No prompts match your filters"}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {posts.length === 0
              ? "Be the first to share a prompt with the community."
              : "Try another tag or clear your search."}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="hero_btn_secondary mt-4"
            >
              Clear filters
            </button>
          )}
          <Link href="/create-prompt" className="hero_btn_primary mt-4">
            Create a prompt
          </Link>
        </div>
      )}
    </section>
  )
}

export default Feed
