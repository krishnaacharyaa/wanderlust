import {
  createPostHandler,
  deletePostByIdHandler,
  getAllPostsHandler,
  getFeaturedPostsHandler,
  getLatestPostsHandler,
  getPostByCategoryHandler,
  getPostByIdHandler,
  updatePostHandler,
} from '../../../controllers/posts-controller.js';
import Post from '../../../models/post.js';
import { validCategories, HTTP_STATUS, RESPONSE_MESSAGES } from '../../../utils/constants.js';
import { createPostObject, createRequestObject, res } from '../../utils/helper-objects.js';

jest.mock('../../../models/post.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('createPostHandler', () => {
  it('Post creation: Success - All fields are valid', async () => {
    const postObject = createPostObject();
    const req = createRequestObject({ body: postObject });

    Post.mockImplementationOnce(() => ({
      save: jest.fn().mockResolvedValueOnce(postObject),
    }));

    await createPostHandler(req, res);

    expect(Post).toHaveBeenCalledTimes(1);
    expect(Post).toHaveBeenCalledWith(postObject);
    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(postObject);
  });

  it('Post creation: Failure - Invalid image url', async () => {
    const postObject = createPostObject({
      imageLink: 'https://www.forTestingPurposeOnly/my-image.gif', // Invalid image URL
    });
    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGES.POSTS.INVALID_IMAGE_URL,
    });
  });

  it('Post creation: Failure - Some fields are missing', async () => {
    const postObject = createPostObject();
    delete postObject.title;
    delete postObject.authorName;

    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS });
  });

  it('Post creation: Failure - Too Many Categories', async () => {
    const postObject = createPostObject({
      categories: [validCategories[0], validCategories[1], validCategories[2], validCategories[3]], // 4 categories
    });
    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGES.POSTS.MAX_CATEGORIES,
    });
  });

  it('Post creation: Failure - Internal server error', async () => {
    const postObject = createPostObject();
    const req = createRequestObject({ body: postObject });

    Post.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR)),
    }));

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});

describe('getAllPostsHandler', () => {
  it('Get all posts: Success - Retrieving all posts list', async () => {
    const req = createRequestObject();

    const mockPosts = [
      createPostObject({ title: 'Test Post - 1' }),
      createPostObject({ title: 'Test Post - 2', isFeaturedPost: true }),
      createPostObject({ title: 'Test Post - 3' }),
    ];

    Post.find = jest.fn().mockResolvedValueOnce(mockPosts);

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('Get all posts: Failure - Internal Server Error', async () => {
    const req = createRequestObject();

    Post.find = jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});

describe('getFeaturedPostsHandler', () => {
  it('Get featured posts: Success - Retrieving all featured posts list', async () => {
    const req = createRequestObject();

    const mockFeaturedPosts = [
      createPostObject({ title: 'Test Post - 1', isFeaturedPost: true }),
      createPostObject({ title: 'Test Post - 2', isFeaturedPost: true }),
      createPostObject({ title: 'Test Post - 3', isFeaturedPost: true }),
    ];

    Post.find = jest.fn().mockResolvedValueOnce(mockFeaturedPosts);

    await getFeaturedPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(mockFeaturedPosts);
  });

  it('Get featured posts: Failure - Internal Server Error', async () => {
    const req = createRequestObject();

    Post.find = jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    await getFeaturedPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});

describe('getPostByCategoryHandler', () => {
  it('Get posts by category: Success - Retrieving posts list of specified category', async () => {
    const req = createRequestObject({ params: { category: validCategories[1] } });

    const mockPosts = [
      createPostObject({ title: 'Test Post - 1', categories: [validCategories[1]] }),
      createPostObject({ title: 'Test Post - 2', categories: [validCategories[1]] }),
      createPostObject({ title: 'Test Post - 3', categories: [validCategories[1]] }),
    ];

    Post.find = jest.fn().mockResolvedValueOnce(mockPosts);

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('Get posts by category: Failure - Invalid category', async () => {
    const req = createRequestObject({ params: { category: 'Invalid Category' } });

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.POSTS.INVALID_CATEGORY });
  });

  it('Get posts by category: Failure - Internal Server Error', async () => {
    const req = createRequestObject({ params: { category: validCategories[1] } });

    Post.find = jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});

describe('getLatestPostsHandler', () => {
  it('Get latest posts: Success - Retrieving most recent posts list', async () => {
    const req = createRequestObject();

    const mockPosts = [
      createPostObject({ title: 'Test Post - 1' }),
      createPostObject({ title: 'Test Post - 2' }),
      createPostObject({ title: 'Test Post - 3' }),
    ];

    Post.find.mockReturnValueOnce({
      sort: jest.fn().mockResolvedValueOnce(mockPosts),
    });

    await getLatestPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('Get latest posts: Failure - Internal Server Error', async () => {
    const req = createRequestObject();

    Post.find.mockReturnValueOnce({
      sort: jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR)),
    });

    await getLatestPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});

describe('getPostByIdHandler', () => {
  it('Get post by ID: Success - Retrieving Specific Post', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const mockPost = createPostObject({ _id: '6910293383' });

    Post.findById = jest.fn().mockResolvedValueOnce(mockPost);

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('Get post by ID: Failure - Post not found (Specified post ID is invalid)', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    Post.findById = jest.fn().mockResolvedValueOnce(null);

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
  });

  it('Get post by ID: Failure - Internal Server Error', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    Post.findById = jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});

describe('updatePostHandler', () => {
  it('Update post: Success - Modifying post content', async () => {
    const req = createRequestObject({
      params: { id: '6910293383' },
      body: { title: 'Updated Post' },
    });

    const mockPost = createPostObject({ _id: '6910293383', title: 'Updated Post' });

    // Mock the behavior of Post.findByIdAndUpdate
    Post.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockPost);

    await updatePostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('Update post: Failure - Post not found (Specified post ID is invalid)', async () => {
    const req = createRequestObject({
      params: { id: '6910293383' },
      body: { title: 'Updated Post' },
    });

    // Mock the behavior of Post.findByIdAndUpdate
    Post.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

    await updatePostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
  });

  it('Update post: Failure - Internal Server Error', async () => {
    const req = createRequestObject({
      params: { id: '6910293383' },
      body: { title: 'Updated Post' },
    });
    // Mock the behavior of Post.findByIdAndUpdate
    Post.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    await updatePostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});

describe('deletePostByIdHandler', () => {
  it('Delete Post: Success - Removing Post with specified ID', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const mockPost = createPostObject({ _id: '6910293383' });

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndDelete = jest.fn().mockResolvedValueOnce(mockPost);

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
    expect(res.json).toHaveBeenCalledWith({
      message: RESPONSE_MESSAGES.POSTS.DELETED,
    });
  });

  it('Delete Post: Failure - Post not found (Specified post ID is invalid)', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.POSTS.NOT_FOUND });
  });

  it('Delete Post: Failure - Internal Server Error', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});
