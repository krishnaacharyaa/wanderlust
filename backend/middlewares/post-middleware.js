import Post from '../models/post.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import User from '../models/user.js';

export const isAuthorMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
    }
    const user = await User.findById(userId);
    const isOwner = user.posts.includes(postId);

    if (!isOwner) {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: RESPONSE_MESSAGES.POSTS.NOT_ALLOWED });
    }
    next();
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
