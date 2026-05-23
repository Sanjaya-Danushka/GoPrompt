import React from "react"
import Feed from "../components/Feed"

const Home = () => {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br />
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Prompts</span>
      </h1>
      <p className="desc text-center">
        GoPrompt is an open-source AI prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      {/* feed */}
      <Feed />
    </section>
  )
}

export default Home
