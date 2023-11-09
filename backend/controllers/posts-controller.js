import Post from '../models/post.js';

export const createPostHandler = async (req, res) => {
  try {
    const post = new Post(req.body);
    const savedPost = await post.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllPostsHandler = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getFeaturedPostsHandler = async (req, res) => {
  try {
    const featuredPosts = await Post.find({ isFeaturedPost: true });
    res.status(200).json(featuredPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostByCategoryHandler = async (req, res) => {
  const category = req.params.category;
  try {
    const categoryPosts = await Post.find({ categories: category });
    res.status(200).json(categoryPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLatestPostsHandler = async (req, res) => {
  try {
    const latestPosts = await Post.find().sort({ timeOfPost: -1 });
    res.status(200).json(latestPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPostByIdHandler = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: 'Post not found' });
  }
};

export const updatePostHandler = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: 'Post not found' });
  }
};

export const deletePostByIdHandler = async (req, res) => {
  try {
    await Post.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(404).json({ message: 'Post not found' });
  }
};
