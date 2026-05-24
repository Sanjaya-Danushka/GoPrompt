// get and patch and delete

import { formatPrompt, formatPrompts } from "@/lib/formatPrompt"
import Prompt from "@models/prompt"
import connectToDatabase from "@utils/database"

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    await connectToDatabase()
    const prompt = await Prompt.findById(id)
      .populate({
        path: "creator",
        model: "User",
        select: "-password",
      })
      .lean()
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 })
    }
    return new Response(JSON.stringify(formatPrompt(prompt)), { status: 200 })
  } catch (error) {
    console.error("Error fetching prompt:", error)
    return new Response("Failed to fetch the prompt", { status: 500 })
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    await connectToDatabase()
    const { prompt, tag } = await request.json()
    const existingPrompt = await Prompt.findById(id)
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 })
    }
    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    await existingPrompt.save()
    return new Response("Prompt updated successfully", { status: 200 })
  } catch (error) {
    console.error("Error updating prompt:", error)
    return new Response("Failed to update the prompt", { status: 500 })
  }
}

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    await connectToDatabase()
    const existingPrompt = await Prompt.findById(id)
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 })
    }
    await Prompt.findByIdAndDelete(id)
    return new Response("Prompt deleted successfully", { status: 200 })
  } catch (error) {
    console.error("Error deleting prompt:", error)
    return new Response("Failed to delete the prompt", { status: 500 })
  }
}

export const GET_ALL = async (request: Request) => {
  try {
    await connectToDatabase()
    const prompts = await Prompt.find({})
      .populate({
        path: "creator",
        model: "User",
        select: "-password",
      })
      .lean()

    // Transform the data to match the expected structure
    return new Response(JSON.stringify(formatPrompts(prompts)), { status: 200 })
  } catch (error) {
    console.error("Error fetching prompts:", error)
    return new Response("Failed to fetch all prompts", { status: 500 })
  }
}
