import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    postUserId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    postUsername: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    userPicture: String,
    postPic: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        body: {
          type: String,
          required: true,
        }
      },
    ],
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);
export default Post;
