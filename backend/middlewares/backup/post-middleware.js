import Post from '../models/post.js';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import { Request, Response, NextFunction } from 'express';

export const isAuthorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user._id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
    }

    console.log(post.authorId, userId);
    if (post.authorId.toString() !== userId) {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: RESPONSE_MESSAGES.POSTS.NOT_ALLOWED });
    }
    next();
  } catch (error: any) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
