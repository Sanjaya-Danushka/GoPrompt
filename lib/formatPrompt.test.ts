import { describe, expect, it } from "vitest"
import { formatPrompt, formatPrompts } from "./formatPrompt"

const mockId = { toString: () => "507f1f77bcf86cd799439011" }
const createdAt = new Date("2024-06-01T12:00:00.000Z")

const leanPrompt = {
  _id: mockId,
  prompt: "Write a product description",
  tag: "marketing",
  createdAt,
  creator: {
    _id: { toString: () => "507f1f77bcf86cd799439012" },
    username: "jane",
    email: "jane@example.com",
    image: "https://example.com/avatar.png",
  },
}

describe("formatPrompt", () => {
  it("maps a lean prompt to the API response shape", () => {
    const result = formatPrompt(leanPrompt)

    expect(result).toEqual({
      _id: "507f1f77bcf86cd799439011",
      prompt: "Write a product description",
      tag: "marketing",
      userId: "507f1f77bcf86cd799439012",
      createdAt: "2024-06-01T12:00:00.000Z",
      creator: {
        _id: "507f1f77bcf86cd799439012",
        username: "jane",
        email: "jane@example.com",
        image: "https://example.com/avatar.png",
      },
    })
  })

  it("fills default creator fields when missing", () => {
    const result = formatPrompt({
      ...leanPrompt,
      createdAt: undefined,
      creator: {
        _id: mockId,
        username: "anon",
      },
    })

    expect(result.creator.email).toBe("")
    expect(result.creator.image).toBe("/assets/icons/default-avatar.svg")
    expect(result.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T/)
  })
})

describe("formatPrompts", () => {
  it("formats multiple prompts", () => {
    const results = formatPrompts([leanPrompt, leanPrompt])
    expect(results).toHaveLength(2)
    expect(results[0]._id).toBe("507f1f77bcf86cd799439011")
  })
})
