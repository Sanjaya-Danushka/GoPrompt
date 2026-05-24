"use client"

import Image from "next/image"
import Link from "next/link"
import { Plus, FileText } from "lucide-react"
import PromptCard from "./promptCard"

interface Post {
  _id: string
  prompt: string
  tag: string
  creator: {
    _id: string
    username: string
    email: string
    image: string
  }
}

interface ProfileUser {
  name?: string | null
  email?: string | null
  image?: string | null
}

interface ProfileProps {
  user: ProfileUser
  data: Post[]
  loading?: boolean
  handleEdit?: (post: Post) => void
  handleDelete?: (post: Post) => void
}

const Profile = ({
  user,
  data,
  loading,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  const displayName =
    user.name || user.email?.split("@")[0] || "Creator"

  return (
    <section className="profile_page">
      <div className="page_container py-10 md:py-14">
        {/* Profile header */}
        <div className="profile_header">
          <div className="profile_header_main">
            <Image
              src={user.image || "/assets/images/profile.svg"}
              alt={displayName}
              width={88}
              height={88}
              className="profile_avatar"
            />
            <div>
              <p className="section_label text-violet-600">Your profile</p>
              <h1 className="profile_name">{displayName}</h1>
              {user.email && (
                <p className="profile_email">{user.email}</p>
              )}
            </div>
          </div>

          <div className="profile_header_actions">
            <div className="profile_stat">
              <FileText className="h-5 w-5 text-violet-600" />
              <div>
                <p className="profile_stat_value">
                  {loading ? "—" : data.length}
                </p>
                <p className="profile_stat_label">Published prompts</p>
              </div>
            </div>
            <Link href="/create-prompt" className="nav_cta">
              <Plus className="h-4 w-4" />
              New prompt
            </Link>
          </div>
        </div>

        {/* Prompts section */}
        <div className="profile_content">
          <div className="profile_section_head">
            <div>
              <h2 className="profile_section_title">Your prompts</h2>
              <p className="profile_section_desc">
                Manage, edit, or remove prompts you&apos;ve shared with the
                community.
              </p>
            </div>
            {!loading && data.length > 0 && (
              <span className="feed_count">{data.length} total</span>
            )}
          </div>

          {loading ? (
            <div className="prompt_layout mt-8">
              {[1, 2].map((i) => (
                <div key={i} className="prompt_card animate-pulse">
                  <div className="h-10 w-10 rounded-full bg-gray-200" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                  <div className="mt-2 h-4 w-full rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : data.length > 0 ? (
            <div className="prompt_layout mt-8">
              {data.map((post) => (
                <PromptCard
                  key={post._id}
                  post={post}
                  handleEdit={() => handleEdit?.(post)}
                  handleDelete={() => handleDelete?.(post)}
                />
              ))}
            </div>
          ) : (
            <div className="profile_empty">
              <div className="profile_empty_icon">
                <FileText className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="font-satoshi text-lg font-semibold text-gray-900">
                No prompts yet
              </h3>
              <p className="mt-2 max-w-sm text-sm text-gray-600">
                Share your first AI prompt with the community. It only takes a
                minute to publish.
              </p>
              <Link href="/create-prompt" className="nav_cta mt-6">
                <Plus className="h-4 w-4" />
                Create your first prompt
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Profile
