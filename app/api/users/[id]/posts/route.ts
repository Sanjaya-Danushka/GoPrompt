import Prompt from "@models/prompt"
import connectToDatabase from "@utils/database"

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    await connectToDatabase()
    const prompts = await Prompt.find({ creator: id })
      .populate({
        path: "creator",
        model: "User",
        select: "-password",
      })
      .lean()

    // Transform the data to match the expected structure
    const formattedPrompts = prompts.map((prompt) => ({
      _id: prompt._id.toString(),
      prompt: prompt.prompt,
      tag: prompt.tag,
      userId: prompt.creator._id.toString(),
      createdAt: prompt.createdAt?.toISOString() || new Date().toISOString(),
      creator: {
        _id: prompt.creator._id.toString(),
        username: prompt.creator.username,
        email: prompt.creator.email || "",
        image: prompt.creator.image || "/assets/icons/default-avatar.svg",
      },
    }))

    return new Response(JSON.stringify(formattedPrompts), { status: 200 })
  } catch (error) {
    console.error("Error fetching prompts:", error)
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}
