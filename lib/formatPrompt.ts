export interface PopulatedCreator {
  _id: { toString(): string }
  username: string
  email?: string
  image?: string
}

export interface LeanPrompt {
  _id: { toString(): string }
  prompt: string
  tag: string
  creator: PopulatedCreator
  createdAt?: Date
}

export function formatPrompt(prompt: LeanPrompt) {
  return {
    _id: prompt._id.toString(),
    prompt: prompt.prompt,
    tag: prompt.tag,
    userId: prompt.creator._id.toString(),
    createdAt: prompt.createdAt?.toISOString() ?? new Date().toISOString(),
    creator: {
      _id: prompt.creator._id.toString(),
      username: prompt.creator.username,
      email: prompt.creator.email ?? "",
      image: prompt.creator.image ?? "/assets/icons/default-avatar.svg",
    },
  }
}

export function formatPrompts(prompts: LeanPrompt[]) {
  return prompts.map(formatPrompt)
}
