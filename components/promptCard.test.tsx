import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"
import PromptCard from "./promptCard"

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(() => "/feed"),
}))

const post = {
  _id: "post1",
  prompt: "Explain quantum computing simply",
  tag: "education",
  creator: {
    _id: "user1",
    username: "alice",
    email: "alice@example.com",
    image: "/assets/images/profile.svg",
  },
}

const writeText = vi.fn().mockResolvedValue(undefined)

describe("PromptCard", () => {
  beforeEach(() => {
    writeText.mockClear()
    vi.stubGlobal("navigator", {
      ...navigator,
      clipboard: { writeText },
    })
  })

  it("renders prompt content and creator", () => {
    render(<PromptCard post={post} />)

    expect(screen.getByText(post.prompt)).toBeInTheDocument()
    expect(screen.getByText(post.tag)).toBeInTheDocument()
    expect(screen.getByText("alice")).toBeInTheDocument()
    expect(screen.getByText("alice@example.com")).toBeInTheDocument()
  })

  it("copies prompt text to clipboard", () => {
    const { container } = render(<PromptCard post={post} />)
    const copyBtn = container.querySelector(".copy_btn")
    expect(copyBtn).not.toBeNull()

    fireEvent.click(copyBtn!)

    expect(writeText).toHaveBeenCalledWith(post.prompt)
  })

  it("calls handleTagClick when tag is clicked", async () => {
    const user = userEvent.setup()
    const handleTagClick = vi.fn()
    render(<PromptCard post={post} handleTagClick={handleTagClick} />)

    await user.click(screen.getByText(post.tag))

    expect(handleTagClick).toHaveBeenCalledWith("education")
  })
})
