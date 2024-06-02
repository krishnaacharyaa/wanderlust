import Post from '../models/post.js';
import {
  deleteDataFromCache,
  retrieveDataFromCache,
  storeDataInCache,
} from '../utils/cache-posts.js';
import { HTTP_STATUS, REDIS_KEYS, RESPONSE_MESSAGES, validCategories } from '../utils/constants.js';
export const createPostHandler = async (req, res) => {
  try {
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
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS });
    }

    // Validation - check if imageLink is a valid URL
    const imageLinkRegex = /\.(jpg|jpeg|png|webp)$/i;
    if (!imageLinkRegex.test(imageLink)) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGES.POSTS.INVALID_IMAGE_URL });
    }

    // Validation - check if categories array has more than 3 items
    if (categories.length > 3) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGES.POSTS.MAX_CATEGORIES });
    }

    const post = new Post({
      title,
      authorName,
      imageLink,
      description,
      categories,
      isFeaturedPost,
    });

    const [savedPost] = await Promise.all([
      post.save(), // Save the post
      deleteDataFromCache(REDIS_KEYS.ALL_POSTS), // Invalidate cache for all posts
      deleteDataFromCache(REDIS_KEYS.FEATURED_POSTS), // Invalidate cache for featured posts
      deleteDataFromCache(REDIS_KEYS.LATEST_POSTS), // Invalidate cache for latest posts
    ]);

    res.status(HTTP_STATUS.OK).json(savedPost);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const getAllPostsHandler = async (req, res) => {
  try {
    const posts = await Post.find();
    await storeDataInCache(REDIS_KEYS.ALL_POSTS, posts);
    return res.status(HTTP_STATUS.OK).json(posts);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const getFeaturedPostsHandler = async (req, res) => {
  try {
    const featuredPosts = await Post.find({ isFeaturedPost: true });
    await storeDataInCache(REDIS_KEYS.FEATURED_POSTS, featuredPosts);
    res.status(HTTP_STATUS.OK).json(featuredPosts);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const getPostByCategoryHandler = async (req, res) => {
  const category = req.params.category;
  try {
    // Validation - check if category is valid
    if (!validCategories.includes(category)) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGES.POSTS.INVALID_CATEGORY });
    }

    const categoryPosts = await Post.find({ categories: category });
    res.status(HTTP_STATUS.OK).json(categoryPosts);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const getLatestPostsHandler = async (req, res) => {
  try {
    const latestPosts = await Post.find().sort({ timeOfPost: -1 });
    await storeDataInCache(REDIS_KEYS.LATEST_POSTS, latestPosts);
    res.status(HTTP_STATUS.OK).json(latestPosts);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const getPostByIdHandler = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Validation - check if post exists
    if (!post) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
    }

    res.status(HTTP_STATUS.OK).json(post);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const updatePostHandler = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    // Validation - check if post exists
    if (!updatedPost) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
    }

    res.status(HTTP_STATUS.OK).json(updatedPost);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const deletePostByIdHandler = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    // Validation - check if post exists
    if (!post) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
    }

    res.status(HTTP_STATUS.OK).json({ message: RESPONSE_MESSAGES.POSTS.DELETED });
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
