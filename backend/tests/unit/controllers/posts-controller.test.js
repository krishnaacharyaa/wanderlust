import {
  createPostHandler,
  getAllPostsHandler,
  getFeaturedPostsHandler,
  getPostByCategoryHandler,
  getLatestPostsHandler,
  getPostByIdHandler,
  updatePostHandler,
  deletePostByIdHandler,
} from '../../../controllers/posts-controller.js';
import Post from '../../../models/post.js';
import { validCategories } from '../../../utils/constants.js';

jest.mock('../../../models/post.js', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

const createPostObject = (options = {}) => {
  return {
    title: options.title || 'Test Post',
    authorName: options.authorName || 'Test Author',
    imageLink: options.imageLink || 'https://www.forTestingPurposeOnly/my-image.jpg',
    categories: options.categories || [validCategories[0]],
    description: options.description || 'This is a test post.',
    isFeaturedPost: options.isFeaturedPost || false,
    ...options,
  };
};

const createRequestObject = (options = {}) => {
  return {
    body: options.body || {},
    params: options.params || {},
  };
};

describe('createPostHandler', () => {
  it('should create a new post', async () => {
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

  it('should handle errors - Invalid Image URL', async () => {
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

  it('should handle errors - Missing Form Fields', async () => {
    const postObject = createPostObject();
    delete postObject.title;
    delete postObject.authorName;

    const req = createRequestObject({ body: postObject });

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
  });

  it('should handle errors - Too Many Categories', async () => {
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

  it('should handle errors - Internal Server Error', async () => {
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
  it('should get all posts', async () => {
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

  it('should handle errors - Internal Server Error', async () => {
    const req = createRequestObject();

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getFeaturedPostsHandler', () => {
  it('should get featured posts', async () => {
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

  it('should handle errors - Internal Server Error', async () => {
    const req = createRequestObject();

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getFeaturedPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getPostByCategoryHandler', () => {
  it('should get posts by category', async () => {
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

  it('should handle errors - Invalid Category', async () => {
    const req = createRequestObject({ params: { category: 'Invalid Category' } });

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid category' });
  });

  it('should handle errors - Internal Server Error', async () => {
    const req = createRequestObject({ params: { category: validCategories[1] } });

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getLatestPostsHandler', () => {
  it('should get latest posts', async () => {
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

  it('should handle errors - Internal Server Error', async () => {
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
  it('should get post by id', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const mockPost = createPostObject({ _id: '6910293383' });

    Post.findById = jest.fn().mockResolvedValueOnce(mockPost);

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('should handle errors - Post not found', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Post not found';
    Post.findById = jest.fn().mockResolvedValueOnce(null);

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it('should handle errors - Internal Server Error', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Internal Server Error';
    Post.findById = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('updatePostHandler', () => {
  it('should update post', async () => {
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

  it('should handle errors - Post not found', async () => {
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

  it('should handle errors - Internal Server Error', async () => {
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
  it('should delete post', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const mockPost = createPostObject({ _id: '6910293383' });

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndRemove = jest.fn().mockResolvedValueOnce(mockPost);

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post deleted',
    });
  });

  it('should handle errors - Post not found', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Post not found';

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndRemove = jest.fn().mockResolvedValueOnce(null);

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });

  it('should handle errors - Internal Server Error', async () => {
    const req = createRequestObject({ params: { id: '6910293383' } });

    const errorMessage = 'Internal Server Error';

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndRemove = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
