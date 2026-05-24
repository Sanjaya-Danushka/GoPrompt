"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn()
    }
  }, [status])

  const handleEdit = (post: Post) => {
    router.push(`/update-prompt/${post._id}`)
  }

  const handleDelete = async (post: Post) => {
    if (!confirm("Delete this prompt? This cannot be undone.")) return

    try {
      const response = await fetch(`/api/prompt/${post._id}`, {
        method: "DELETE",
      })
      if (response.ok) {
        setPosts((prev) => prev.filter((p) => p._id !== post._id))
      }
    } catch (error) {
      console.error("Failed to delete prompt:", error)
    }
  }

  useEffect(() => {
    const fetchPosts = async () => {
      if (status !== "authenticated" || !session?.user?.id) return

      setLoading(true)
      try {
        const response = await fetch(`/api/users/${session.user.id}/posts`)
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
  }, [status, session?.user?.id])

  if (status === "loading") {
    return (
      <div className="page_container py-20">
        <p className="text-gray-600">Loading profile…</p>
      </div>
    )
  }

  if (!session?.user) return null

  return (
    <Profile
      user={{
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }}
      data={posts}
      loading={loading}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile
