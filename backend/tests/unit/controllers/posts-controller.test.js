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
import { validCategories } from '../../../utils/constants.js';
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
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(postObject);
  });

  it('Post creation: Failure - Invalid image url', async () => {
    const postObject = createPostObject({
      imageLink: 'https://www.forTestingPurposeOnly/my-image.gif', // Invalid image URL
    });
    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Image URL must end with .jpg, .jpeg, or .png',
    });
  });

  it('Post creation: Failure - Some fields are missing', async () => {
    const postObject = createPostObject();
    delete postObject.title;
    delete postObject.authorName;

    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
  });

  it('Post creation: Failure - Too Many Categories', async () => {
    const postObject = createPostObject({
      categories: [validCategories[0], validCategories[1], validCategories[2], validCategories[3]], // 4 categories
    });
    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Please select up to three categories only.',
    });
  });

  it('Post creation: Failure - Internal server error', async () => {
    const postObject = createPostObject();
    const req = createRequestObject({ body: postObject });

    const errorMessage = 'Internal Server Error';
    Post.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    }));

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('Get all posts: Failure - Internal Server Error', async () => {
    const req = createRequestObject();

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFeaturedPosts);
  });

  it('Get featured posts: Failure - Internal Server Error', async () => {
    const req = createRequestObject();

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getFeaturedPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('Get posts by category: Failure - Invalid category', async () => {
    const req = createRequestObject({ params: { category: 'Invalid Category' } });

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid category' });
  });

  it('Get posts by category: Failure - Internal Server Error', async () => {
    const req = createRequestObject({ params: { category: validCategories[1] } });

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('Get latest posts: Failure - Internal Server Error', async () => {
    const req = createRequestObject();

    const errorMessage = 'Internal Server Error';
    Post.find.mockReturnValueOnce({
      sort: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    });

    await getLatestPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getPostByIdHandler', () => {
  it('Get post by ID: Success - Retrieving Specific Post', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const mockPost = createPostObject({ _id: '6910293383' });

    Post.findById = jest.fn().mockResolvedValueOnce(mockPost);

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('Get post by ID: Failure - Post not found (Specified post ID is invalid)', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Post not found';
    Post.findById = jest.fn().mockResolvedValueOnce(null);

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it('Get post by ID: Failure - Internal Server Error', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Internal Server Error';
    Post.findById = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
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

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('Update post: Failure - Post not found (Specified post ID is invalid)', async () => {
    const req = createRequestObject({
      params: { id: '6910293383' },
      body: { title: 'Updated Post' },
    });

    const errorMessage = 'Post not found';

    // Mock the behavior of Post.findByIdAndUpdate
    Post.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(null);

    await updatePostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it('Update post: Failure - Internal Server Error', async () => {
    const req = createRequestObject({
      params: { id: '6910293383' },
      body: { title: 'Updated Post' },
    });

    const errorMessage = 'Internal Server Error';

    // Mock the behavior of Post.findByIdAndUpdate
    Post.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await updatePostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('deletePostByIdHandler', () => {
  it('Delete Post: Success - Removing Post with specified ID', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const mockPost = createPostObject({ _id: '6910293383' });

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndDelete = jest.fn().mockResolvedValueOnce(mockPost);

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post deleted',
    });
  });

  it('Delete Post: Failure - Post not found (Specified post ID is invalid)', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Post not found';

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndDelete = jest.fn().mockResolvedValueOnce(null);

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it('Delete Post: Failure - Internal Server Error', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Internal Server Error';

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndDelete = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
