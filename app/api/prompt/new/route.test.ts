import { beforeEach, describe, expect, it, vi } from "vitest"
import { POST } from "./route"

vi.mock("@utils/database", () => ({
  default: vi.fn(),
}))

vi.mock("@models/prompt", () => ({
  default: {
    create: vi.fn(),
  },
}))

import Prompt from "@models/prompt"
import connectToDatabase from "@utils/database"

describe("POST /api/prompt/new", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates a prompt and returns 201", async () => {
    const saved = { _id: "new-id", prompt: "Hello", tag: "greeting" }
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    vi.mocked(Prompt.create).mockResolvedValue({
      ...saved,
      save: vi.fn().mockResolvedValue(saved),
    } as never)

    const request = new Request("http://localhost/api/prompt/new", {
      method: "POST",
      body: JSON.stringify({
        userId: "user1",
        prompt: "Hello",
        tag: "greeting",
      }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(Prompt.create).toHaveBeenCalledWith({
      creator: "user1",
      prompt: "Hello",
      tag: "greeting",
    })
    expect(data.prompt).toBe("Hello")
  })

  it("returns 500 when creation fails", async () => {
    vi.mocked(connectToDatabase).mockResolvedValue(undefined)
    vi.mocked(Prompt.create).mockRejectedValue(new Error("fail"))

    const request = new Request("http://localhost/api/prompt/new", {
      method: "POST",
      body: JSON.stringify({ userId: "u", prompt: "p", tag: "t" }),
    })

    const response = await POST(request)

    expect(response.status).toBe(500)
    expect(await response.text()).toBe("Failed to create a new prompt")
  })
})
