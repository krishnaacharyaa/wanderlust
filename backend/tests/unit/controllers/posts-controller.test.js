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

describe('createPostHandler', () => {
  it('should create a new post', async () => {
    const postObject = {
      title: 'Test Post',
      authorName: 'Test Author',
      imageLink: 'https://www.forTestingPurposeOnly/my-image.jpg',
      categories: [validCategories[0]],
      description: 'This is a test post.',
      isFeaturedPost: false,
    };
    const req = { body: postObject };

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
    const postObject = {
      title: 'Test Post',
      authorName: 'Test Author',
      // Invalid extension
      imageLink: 'https://www.forTestingPurposeOnly/my-image.gif',
      categories: [validCategories[0]],
      description: 'This is a test post.',
      isFeaturedPost: false,
    };
    const req = { body: postObject };

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Image URL must end with .jpg, .jpeg, or .png' });
  });

  it('should handle errors - Missing Form Fields', async () => {
    const postObject = {
      title: 'Test Post',
      authorName: 'Test Author',
      // Missing imageLink, categories, and description
      isFeaturedPost: false,
    };
    const req = { body: postObject };

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
  });

  it('should handle errors - Too Many Categories', async () => {
    const postObject = {
      title: 'Test Post',
      authorName: 'Test Author',
      imageLink: 'https://www.forTestingPurposeOnly/my-image.jpg',
      categories: [validCategories[0], validCategories[1], validCategories[2], validCategories[3]], // More than 3 categories
      description: 'This is a test post.',
      isFeaturedPost: false,
    };
    const req = { body: postObject };

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Please select up to three categories only.' });
  });

  it('should handle errors - Internal Server Error', async () => {
    const postObject = {
      title: 'Test Post',
      authorName: 'Test Author',
      imageLink: 'https://www.forTestingPurposeOnly.my-image.jpg',
      categories: [validCategories[0]],
      description: 'This is a test post.',
      isFeaturedPost: false,
    };
    const req = { body: postObject };

    const errorMessage = 'Internal Server Error';
    Post.mockImplementationOnce(() => ({
      save: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
    }));

    await createPostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getAllPostsHandler', () => {
  it('should get all posts', async () => {
    const req = {};

    const mockPosts = [
      {
        title: 'Test Post - 1',
        authorName: 'Test Author - 1',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-1.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: false,
      },
      {
        title: 'Test Post - 2',
        authorName: 'Test Author - 2',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-2.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: false,
      }
    ];
    Post.find = jest.fn().mockResolvedValueOnce(mockPosts);

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('should handle errors', async () => {
    const req = {};

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getAllPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getFeaturedPostsHandler', () => {
  it('should get featured posts', async () => {
    const req = {};

    const mockFeaturedPosts = [
      {
        title: 'Test Post - 1',
        authorName: 'Test Author - 1',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-1.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: true,
      },
      {
        title: 'Test Post - 2',
        authorName: 'Test Author - 2',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-2.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: true,
      }
    ];

    Post.find = jest.fn().mockResolvedValueOnce(mockFeaturedPosts);

    await getFeaturedPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockFeaturedPosts);
  });

  it('should handle errors', async () => {
    const req = {};

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getFeaturedPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getPostByCategoryHandler', () => {
  it('should get posts by category', async () => {
    const req = { params: { category: validCategories[0] } };

    const mockPosts = [
      {
        title: 'Test Post - 1',
        authorName: 'Test Author - 1',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-1.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: false,
      },
      {
        title: 'Test Post - 2',
        authorName: 'Test Author - 2',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-2.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: false,
      },
      {
        title: 'Test Post - 3',
        authorName: 'Test Author - 3',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-3.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: true,
      }
    ];

    Post.find = jest.fn().mockResolvedValueOnce(mockPosts);

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('should handle errors - Invalid Category', async () => {
    const req = { params: { category: 'Invalid Category' } };

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid category' });
  });

  it('should handle errors', async () => {
    const req = { params: { category: 'Travel' } };

    const errorMessage = 'Internal Server Error';
    Post.find = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getPostByCategoryHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('getLatestPostsHandler', () => {
  it('should get latest posts', async () => {
    const req = {};

    const mockPosts = [
      {
        title: 'Test Post - 1',
        authorName: 'Test Author - 1',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-1.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: false,
      },
      {
        title: 'Test Post - 2',
        authorName: 'Test Author - 2',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-2.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: false,
      }
    ];

    Post.find.mockReturnValueOnce({
      sort: jest.fn().mockResolvedValueOnce(mockPosts),
    });

    await getLatestPostsHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPosts);
  });

  it('should handle errors', async () => {
    const req = {};

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
    const req = { params: { id: '6910293383' } };

    const mockPost = {
        title: 'Test Post - 1',
        authorName: 'Test Author - 1',
        imageLink: 'https://www.forTestingPurposeOnly.my-image-2.jpg',
        categories: [validCategories[0]],
        description: 'This is a test post.',
        isFeaturedPost: false,
        _id: '6910293383',
    };

    Post.findById = jest.fn().mockResolvedValueOnce(mockPost);

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('should handle errors', async () => {
    const req = { params: { id: '6910293383' } };

    const errorMessage = 'Post not found';
    Post.findById = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await getPostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('updatePostHandler', () => {
  it('should update post', async () => {
    const req = {
      params: { id: '6910293383' },
      body: { title: 'Updated Post' },
    };

    const mockPost = {
      title: 'Updated Post',
      _id: '6910293383',
    }

    // Mock the behavior of Post.findByIdAndUpdate
    Post.findByIdAndUpdate = jest.fn().mockResolvedValueOnce(mockPost);

    await updatePostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockPost);
  });

  it('should handle errors', async () => {
    const req = {
      params: { id: '6910293383' },
      body: { title: 'Updated Post' },
    };

    const errorMessage = 'Post not found';

    // Mock the behavior of Post.findByIdAndUpdate
    Post.findByIdAndUpdate = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await updatePostHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});

describe('deletePostByIdHandler', () => {
  it('should delete post', async () => {
    const req = { params: { id: '6910293383' } };

    const mockPost = {
      title: 'Test Post',
      _id: '6910293383',
    };

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndRemove = jest.fn().mockResolvedValueOnce(mockPost);

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post deleted',
    });
  });

  it('should handle errors', async () => {
    const req = { params: { id: '6910293383' } };

    const errorMessage = 'Post not found';

    // Mock the behavior of Post.findByIdAndRemove
    Post.findByIdAndRemove = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

    await deletePostByIdHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
  });
});
