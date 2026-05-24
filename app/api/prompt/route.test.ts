import { beforeEach, describe, expect, it, vi } from "vitest"
import { GET } from "./route"

vi.mock("@utils/database", () => ({
  default: vi.fn(),
}))

vi.mock("@models/prompt", () => ({
  default: {
    find: vi.fn(),
  },
}))

import Prompt from "@models/prompt"
import connectToDatabase from "@utils/database"

const mockLean = () => [
  {
    _id: { toString: () => "abc123" },
    prompt: "Test prompt",
    tag: "test",
    createdAt: new Date("2024-01-01T00:00:00.000Z"),
    creator: {
      _id: { toString: () => "user1" },
      username: "alice",
      email: "alice@example.com",
    },
  },
]

describe("GET /api/prompt", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("returns formatted prompts", async () => {
    const chain = {
      populate: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(mockLean()),
    }
    vi.mocked(Prompt.find).mockReturnValue(chain as never)
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)

    const response = await GET(new Request("http://localhost/api/prompt"))
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveLength(1)
    expect(data[0].prompt).toBe("Test prompt")
    expect(data[0].creator.username).toBe("alice")
    expect(connectToDatabase).toHaveBeenCalledOnce()
  })

  it("returns 500 when the database fails", async () => {
    vi.mocked(connectToDatabase).mockRejectedValue(new Error("db down"))

    const response = await GET(new Request("http://localhost/api/prompt"))

    expect(response.status).toBe(500)
    expect(await response.text()).toBe("Failed to fetch all prompts")
  })
})
