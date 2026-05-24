import Link from "next/link"
import { Lightbulb, Tag } from "lucide-react"

interface Post {
  prompt: string
  tag: string
}

interface FormProps {
  type: "Create" | "Update"
  post: Post
  setPost: (post: Post) => void
  submitting: boolean
  handleSubmit: (e: React.FormEvent) => void
  cancelHref?: string
}

const formCopy = {
  Create: {
    label: "New prompt",
    title: "Share a prompt with the world",
    subtitle:
      "Write something you’d actually use in ChatGPT, Claude, or Gemini. Add a tag so others can find it.",
    submit: "Publish prompt",
    submitting: "Publishing…",
  },
  Update: {
    label: "Edit prompt",
    title: "Update your prompt",
    subtitle: "Refine your wording or change the tag — your changes go live immediately.",
    submit: "Save changes",
    submitting: "Saving…",
  },
}

const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit,
  cancelHref = "/",
}: FormProps) => {
  const copy = formCopy[type]

  const handleTagChange = (value: string) => {
    let tag = value
    if (tag && !tag.startsWith("#")) tag = `#${tag}`
    setPost({ ...post, tag })
  }

  return (
    <section className="form_page">
      <div className="page_container py-10 md:py-16">
        <p className="section_label text-violet-600">{copy.label}</p>
        <h1 className="section_title mt-2 max-w-2xl text-left text-gray-900">
          {copy.title}
        </h1>
        <p className="section_subtitle mt-3 max-w-xl text-left text-gray-600">
          {copy.subtitle}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
          <form onSubmit={handleSubmit} className="form_card">
            <label className="form_field">
              <span className="form_label">Your AI prompt</span>
              <textarea
                value={post.prompt}
                onChange={(e) => setPost({ ...post, prompt: e.target.value })}
                placeholder="e.g. You are an expert copywriter. Write a landing page headline for…"
                required
                rows={10}
                className="form_textarea text-gray-900 placeholder:text-gray-400"
              />
              <span className="form_hint">
                Be specific — include role, tone, and output format for best results.
              </span>
            </label>

            <label className="form_field mt-6">
              <span className="form_label">
                Tag
                <span className="form_label_muted">
                  {" "}
                  (#product, #coding, #writing…)
                </span>
              </span>
              <input
                value={post.tag}
                onChange={(e) => handleTagChange(e.target.value)}
                type="text"
                placeholder="#marketing"
                required
                className="form_input text-gray-900 placeholder:text-gray-400"
              />
            </label>

            <div className="form_actions">
              <Link href={cancelHref} className="form_cancel">
                Cancel
              </Link>
              <button
                type="submit"
                disabled={submitting}
                className="hero_btn_primary disabled:opacity-60"
              >
                {submitting ? copy.submitting : copy.submit}
              </button>
            </div>
          </form>

          <aside className="form_tips">
            <div className="form_tip">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <div>
                <p className="font-satoshi text-sm font-semibold text-gray-900">
                  Prompt tips
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Start with a role (&quot;You are a…&quot;), add constraints, and
                  specify the output format you want.
                </p>
              </div>
            </div>
            <div className="form_tip">
              <Tag className="h-5 w-5 text-violet-600" />
              <div>
                <p className="font-satoshi text-sm font-semibold text-gray-900">
                  Pick one tag
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  Tags help people filter the feed. Use broad niches like #seo or
                  #devtools.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

export default Form
