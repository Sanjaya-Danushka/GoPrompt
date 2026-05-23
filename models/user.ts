import { Schema, model, models } from "mongoose"

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    match: [/^[a-zA-Z0-9]+$/, "Username must be alphanumeric"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
//   password: { type: String, required: [true, "Password is required"] },
  image: { type: String },
})

const User = models.User || model("User", userSchema)
export default User
