import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 20,
  },
  profilePic: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
  },
  viewedProfile: {
    type: Number,
    default: 0,
  },
});

const User = model("User", userSchema);
export default User;
