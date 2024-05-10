import Post from '../models/post.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import { ApiError } from '../utils/error.js';

export const isAuthorMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return new ApiError(HTTP_STATUS.NOT_FOUND, RESPONSE_MESSAGES.POSTS.NOT_FOUND)
    }

    if (!post.authorId.equals(userId)) {
      return new ApiError(HTTP_STATUS.FORBIDDEN, RESPONSE_MESSAGES.POSTS.NOT_ALLOWED)
    }
    next();
  } catch (error) {
    return new ApiError(HTTP_STATUS.INTERNAL_SERVER_ERROR, error.message)
  }
};
