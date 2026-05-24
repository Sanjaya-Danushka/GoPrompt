"use client"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Profile from "@components/Profile"

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

const MyProfile = () => {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [posts, setPosts] = useState<Post[]>([])

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt/${post._id}`)
  }

  const handleDelete = async (post: Post) => {
    try {
      await fetch(`/api/prompt/${post._id}`, { method: "DELETE" })
      setPosts((prev) => prev.filter((p) => p._id !== post._id))
    } catch (error) {
      console.error("Failed to delete prompt:", error)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (status !== "authenticated" || !session?.user?.id) return

      const response = await fetch(`/api/users/${session.user.id}/posts`)
      if (!response.ok) return

      const data = await response.json()
      if (Array.isArray(data)) {
        setPosts(data)
      }
    }
    fetchPosts()
  }, [status, session?.user?.id])
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page. Share your prompts and connect with others."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
