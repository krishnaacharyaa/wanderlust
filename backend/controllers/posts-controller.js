import { catchError } from '../middleware/catchError.js';
import Post from '../models/post.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import { validCategories } from '../utils/constants.js';

export const createPostHandler = catchError(async (req, res) => {
  const {
    title,
    authorName,
    imageLink,
    categories,
    description,
    isFeaturedPost = false,
  } = req.body;

  // Validation - check if all fields are filled
  if (!title || !authorName || !imageLink || !description || !categories) {
    return new ErrorHandler('All fields are required.', 400)
  }

  // Validation - check if imageLink is a valid URL
  const imageLinkRegex = /\.(jpg|jpeg|png)$/i;
  if (!imageLinkRegex.test(imageLink)) {
    return new ErrorHandler('Image URL must end with .jpg, .jpeg, or .png', 400)
  }

  // Validation - check if categories array has more than 3 items
  if (categories.length > 3) {
    return new ErrorHandler('Please select up to three categories only.', 400)
  }

  const post = new Post({
    title,
    authorName,
    imageLink,
    description,
    categories,
    isFeaturedPost,
  });

  const savedPost = await post.save();
  res.status(200).json(savedPost);
})

export const getAllPostsHandler = catchError(async (req, res) => {
  const posts = await Post.find();
  res.status(200).status(200).json(posts);
});

export const getFeaturedPostsHandler =catchError( async (req, res) => {
  const featuredPosts = await Post.find({ isFeaturedPost: true });
  res.status(200).json(featuredPosts);
});

export const getPostByCategoryHandler = catchError(async (req, res) => {
  // Validation - check if category is valid
  if (!validCategories.includes(category)) {
    return res.status(400).json({ message: 'Invalid category' });
  }

  const categoryPosts = await Post.find({ categories: category });
  res.status(200).json(categoryPosts);

});

export const getLatestPostsHandler = catchError(async (req, res) => {
  const latestPosts = await Post.find().sort({ timeOfPost: -1 });
  res.status(200).json(latestPosts);
});

export const getPostByIdHandler = catchError(async (req, res) => {

  const post = await Post.findById(req.params.id);
  // Validation - check if post exists
  if (!post) {
    return new ErrorHandler('Post not found', 400)
  }
  res.status(200).json(post);
});

export const updatePostHandler = catchError(async (req, res) => {
  const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  // Validation - check if post exists
  if (!updatedPost) {
    return new ErrorHandler('Post not found', 400)
  }

  res.status(200).json(updatedPost);
});

export const deletePostByIdHandler = catchError(async (req, res) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  // Validation - check if post exists
  if (!post) {
    return new ErrorHandler('Post not found',400)
  }

  res.status(200).json({ message: 'Post deleted' });
});
