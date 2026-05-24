"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Form from "@components/Form"

interface Post {
  prompt: string
  tag: string
}

const UpdatePrompt = () => {
  const router = useRouter()
  const params = useParams()
  const promptId = params.id as string

  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [post, setPost] = useState<Post>({
    prompt: "",
    tag: "",
  })

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`)
        if (!response.ok) {
          router.push("/profile")
          return
        }

        const data = await response.json()
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        })
      } catch (error) {
        console.error("Failed to fetch prompt:", error)
        router.push("/profile")
      } finally {
        setLoading(false)
      }
    }

    if (promptId) {
      fetchPrompt()
    }
  }, [promptId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push("/profile")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="page_container py-20">
        <p className="text-gray-500">Loading prompt…</p>
      </div>
    )
  }

  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
      cancelHref="/profile"
    />
  )
}

export default UpdatePrompt
