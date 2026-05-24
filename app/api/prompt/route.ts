import { formatPrompts } from "@/lib/formatPrompt"
import Prompt from "@models/prompt"
import connectToDatabase from "@utils/database"

export const GET = async (request: Request) => {
  try {
    await connectToDatabase()
    const prompts = await Prompt.find({})
      .populate({
        path: "creator",
        model: "User",
        select: "-password"
      })
      .lean()

    return new Response(JSON.stringify(formatPrompts(prompts)), { status: 200 })
  } catch (error) {
    console.error("Error fetching prompts:", error)
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}