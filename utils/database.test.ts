import { beforeEach, describe, expect, it, vi } from "vitest"

const connectMock = vi.fn()
const setMock = vi.fn()

vi.mock("mongoose", () => ({
  default: {
    set: setMock,
    connect: connectMock,
  },
}))

describe("connectToDatabase", () => {
  beforeEach(() => {
    vi.resetModules()
    connectMock.mockReset()
    setMock.mockReset()
    process.env.MONGODB_URI = "mongodb://localhost:27017/test"
  })

  it("connects on first call", async () => {
    connectMock.mockResolvedValue(undefined)
    const { default: connectToDatabase } = await import("./database")

    await connectToDatabase()

    expect(setMock).toHaveBeenCalledWith("strictQuery", true)
    expect(connectMock).toHaveBeenCalledWith("mongodb://localhost:27017/test", {
      dbName: "share_prompt",
    })
  })

  it("reuses connection on subsequent calls", async () => {
    connectMock.mockResolvedValue(undefined)
    const { default: connectToDatabase } = await import("./database")

    await connectToDatabase()
    await connectToDatabase()

    expect(connectMock).toHaveBeenCalledTimes(1)
  })

  it("throws when connection fails", async () => {
    connectMock.mockRejectedValue(new Error("connection refused"))
    const { default: connectToDatabase } = await import("./database")

    await expect(connectToDatabase()).rejects.toThrow(
      "Failed to connect to MongoDB"
    )
  })
})
