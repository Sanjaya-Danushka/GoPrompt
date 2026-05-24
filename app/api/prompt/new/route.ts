/* eslint-disable @typescript-eslint/no-unused-vars */

import Prompt from "@models/prompt"
import connectToDatabase from "@utils/database"

export const POST = async (request: Request) => {
  const { userId, prompt, tag } = await request.json()
  // return new Response(JSON.stringify({ message: 'Post created successfully' }));
  try {
    await connectToDatabase()
    const newPrompt = await Prompt.create({
      creator: userId,
      prompt,
      tag,
    })
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 })
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 })
  }
}
