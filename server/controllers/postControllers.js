import Post from "../models/Post";
import User from "../models/User";

export const createPost = async (req, res) => {
  const { userId, username, description, postPic } = req.body;
  const user = await User.findById(userId);
  const newPost = new Post({
    postUserId: userId,
    postUsername: username,
    description,
    location: user.location,
    userPicture: user.profilePic,
    postPic,
    likes: {},
    comments: [],
  });
  await newPost.save();
  const posts = await Post.find();
  return res.status(201).json(posts);
};

export const getFeedPosts = async (req, res) => {
  const posts = await Post.find();
  return res.status(201).json(posts);
};

export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ username });
  return res.status(201).json(posts);
};

export const likePost = async (req, res) => {
  const { username } = req.body;
  const { postId } = req.params;
  const post = await Post.findById(postId);
  const isLiked = post.likes.get(username);
  if (!isLiked) {
    post.likes.set(username, true);
  } else {
    post.likes.delete(username);
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      likes: post.likes,
    },
    { new: true }
  );

  return res.status(201).json(updatedPost);
};
