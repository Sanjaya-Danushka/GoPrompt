import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Footer from "./Footer"

describe("Footer", () => {
  it("renders branding and navigation links", () => {
    render(<Footer />)

    expect(screen.getByText("GoPrompt")).toBeInTheDocument()
    expect(
      screen.getByText(/open prompt hub for AI builders/i)
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /browse feed/i })).toHaveAttribute(
      "href",
      "/feed"
    )
    expect(screen.getByRole("link", { name: /new prompt/i })).toHaveAttribute(
      "href",
      "/create-prompt"
    )
    expect(screen.getByRole("link", { name: /your profile/i })).toHaveAttribute(
      "href",
      "/profile"
    )
  })

  it("shows the current year in the copyright", () => {
    render(<Footer />)

    expect(
      screen.getByText(
        `© ${new Date().getFullYear()} GoPrompt. Crafted for the AI-native generation.`
      )
    ).toBeInTheDocument()
  })
})
