import { describe, expect, it } from "vitest"
import User from "./user"

describe("User model", () => {
  it("requires username and email", async () => {
    const user = new User({})
    const error = await user.validate().catch((e) => e)

    expect(error.errors.username).toBeDefined()
    expect(error.errors.email).toBeDefined()
  })

  it("rejects non-alphanumeric usernames", async () => {
    const user = new User({
      username: "bad user",
      email: "test@example.com",
    })
    const error = await user.validate().catch((e) => e)

    expect(error.errors.username.message).toMatch(/alphanumeric/i)
  })

  it("accepts valid user data", async () => {
    const user = new User({
      username: "jane42",
      email: "jane@example.com",
    })

    await expect(user.validate()).resolves.toBeUndefined()
  })
})
