import { Router } from 'express';
const router = Router();
import {
  createPostHandler,
  getAllPostsHandler,
  getFeaturedPostsHandler,
  getPostByCategoryHandler,
  getLatestPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostByIdHandler,
} from '../controllers/posts-controller.js';

// Create a new post
router.post('/', createPostHandler);

// Get all posts
router.get('/', getAllPostsHandler);

// Route to get featured posts
router.get('/featured', getFeaturedPostsHandler);

// Route to get posts by category
router.get('/categories/:category', getPostByCategoryHandler);

// Route for fetching the latest posts
router.get('/latest', getLatestPostsHandler);
// Get a specific post by ID
router.get('/:id', getPostByIdHandler);

// Update a post by ID
router.patch('/:id', updatePostHandler);

// Delete a post by ID
router.delete('/:id', deletePostByIdHandler);

export default router;
