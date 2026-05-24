"use client"

import PromptCard from "./promptCard"

interface Post {
  _id: string
  prompt: string
  tag: string
  creator: {
    _id: string
    username: string
    email: string
    image: string
  }
}

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
}: {
  name: string
  desc: string
  data: Post[]
  handleEdit?: (post: Post) => void
  handleDelete?: (post: Post) => void
}) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="prompt_layout mt-10">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
      {/* <PromptCardList data={data} handleTagClick={handleTagClick} /> */}
    </section>
  )
}

export default Profile
