import { Router } from 'express';
import {
  createPostHandler,
  deletePostByIdHandler,
  getAllPostsHandler,
  getFeaturedPostsHandler,
  getLatestPostsHandler,
  getPostByCategoryHandler,
  getPostByIdHandler,
  updatePostHandler,
} from '../controllers/posts-controller.js';
import { REDIS_KEYS } from '../utils/constants.js';
import { cacheHandler } from '../utils/middleware.js';
const router = Router();

// Create a new post
router.post('/', createPostHandler);

// Get all posts
router.get('/', cacheHandler(REDIS_KEYS.ALL_POSTS), getAllPostsHandler);

// Route to get featured posts
router.get('/featured', cacheHandler(REDIS_KEYS.FEATURED_POSTS), getFeaturedPostsHandler);

// Route to get posts by category
router.get('/categories/:category', getPostByCategoryHandler);

// Route for fetching the latest posts
router.get('/latest', cacheHandler(REDIS_KEYS.LATEST_POSTS), getLatestPostsHandler);
// Get a specific post by ID
router.get('/:id', getPostByIdHandler);

// Update a post by ID
router.patch('/:id', updatePostHandler);

// Delete a post by ID
router.delete('/:id', deletePostByIdHandler);

export default router;
