import { describe, expect, it } from "vitest"
import Prompt from "./prompt"

describe("Prompt model", () => {
  it("requires prompt and tag", async () => {
    const doc = new Prompt({})
    const error = await doc.validate().catch((e) => e)

    expect(error.errors.prompt).toBeDefined()
    expect(error.errors.tag).toBeDefined()
  })

  it("accepts valid prompt data", async () => {
    const doc = new Prompt({
      prompt: "Summarize this article",
      tag: "writing",
    })

    await expect(doc.validate()).resolves.toBeUndefined()
  })
})
