const Post = require('../models/post.js');
const { HTTP_STATUS, RESPONSE_MESSAGES } = require('../utils/constants.js');

const isAuthorMiddleware = async (req, res, next) => {
  try {
    const userId = req.user._id.toString(); // Ensure userId is a string
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
    }

    console.log(post.authorId.toString(), userId);
    if (post.authorId.toString() !== userId) {
      return res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: RESPONSE_MESSAGES.POSTS.NOT_ALLOWED });
    }

    next();
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

module.exports = isAuthorMiddleware;

