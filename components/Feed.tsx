"use client"

import { useState, useEffect } from "react"
import React from "react"
import PromptCard from "@components/promptCard"

interface Post {
  _id: string
  prompt: string
  tag: string
  userId: string
  createdAt: string
  // Add other properties based on your actual post structure
}

interface PromptCardListProps {
  data: Post[]
  handleTagClick: (tag: string) => void
}

const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="prompt_layout mt-16">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("")
  const [posts, setPosts] = useState<Post[]>([])

  const handlesSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt")
      const data = await response.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])
  return (
    <section className="feed">
      <form className="flex-center relative w-full">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handlesSearchChange}
          required
          className="search_input peer"
        />
        {/* <button className='btn btn-primary absolute right-0' type='submit'>
          Search
        </button> */}
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  )
}

export default Feed
