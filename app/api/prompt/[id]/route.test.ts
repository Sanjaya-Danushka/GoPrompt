import { beforeEach, describe, expect, it, vi } from "vitest"
import { DELETE, GET, PATCH } from "./route"

vi.mock("@utils/database", () => ({
  default: vi.fn(),
}))

vi.mock("@models/prompt", () => ({
  default: {
    findById: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}))

import Prompt from "@models/prompt"
import connectToDatabase from "@utils/database"

const params = Promise.resolve({ id: "abc123" })

const mockPrompt = {
  _id: { toString: () => "abc123" },
  prompt: "Original",
  tag: "old",
  save: vi.fn(),
  creator: {
    _id: { toString: () => "user1" },
    username: "bob",
    email: "bob@example.com",
  },
}

describe("GET /api/prompt/[id]", () => {
  beforeEach(() => vi.clearAllMocks())

  it("returns a formatted prompt", async () => {
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    const chain = {
      populate: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(mockPrompt),
    }
    vi.mocked(Prompt.findById).mockReturnValue(chain as never)

    const response = await GET(new Request("http://localhost"), { params })
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.prompt).toBe("Original")
  })

  it("returns 404 when not found", async () => {
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    const chain = {
      populate: vi.fn().mockReturnThis(),
      lean: vi.fn().mockResolvedValue(null),
    }
    vi.mocked(Prompt.findById).mockReturnValue(chain as never)

    const response = await GET(new Request("http://localhost"), { params })

    expect(response.status).toBe(404)
  })
})

describe("PATCH /api/prompt/[id]", () => {
  beforeEach(() => vi.clearAllMocks())

  it("updates prompt fields", async () => {
    const existing = { ...mockPrompt, save: vi.fn().mockResolvedValue(undefined) }
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    vi.mocked(Prompt.findById).mockResolvedValue(existing as never)

    const request = new Request("http://localhost", {
      method: "PATCH",
      body: JSON.stringify({ prompt: "Updated", tag: "new" }),
    })

    const response = await PATCH(request, { params })

    expect(response.status).toBe(200)
    expect(existing.prompt).toBe("Updated")
    expect(existing.tag).toBe("new")
    expect(existing.save).toHaveBeenCalled()
  })

  it("returns 404 when prompt does not exist", async () => {
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    vi.mocked(Prompt.findById).mockResolvedValue(null)

    const request = new Request("http://localhost", {
      method: "PATCH",
      body: JSON.stringify({ prompt: "x", tag: "y" }),
    })

    const response = await PATCH(request, { params })

    expect(response.status).toBe(404)
  })
})

describe("DELETE /api/prompt/[id]", () => {
  beforeEach(() => vi.clearAllMocks())

  it("deletes an existing prompt", async () => {
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    vi.mocked(Prompt.findById).mockResolvedValue(mockPrompt as never)
    vi.mocked(Prompt.findByIdAndDelete).mockResolvedValue(mockPrompt as never)

    const response = await DELETE(new Request("http://localhost"), { params })

    expect(response.status).toBe(200)
    expect(Prompt.findByIdAndDelete).toHaveBeenCalledWith("abc123")
  })

  it("returns 404 when prompt does not exist", async () => {
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    vi.mocked(Prompt.findById).mockResolvedValue(null)

    const response = await DELETE(new Request("http://localhost"), { params })

    expect(response.status).toBe(404)
  })
})
