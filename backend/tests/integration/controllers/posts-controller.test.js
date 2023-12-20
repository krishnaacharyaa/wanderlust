import mongoose from 'mongoose';
import request from 'supertest';
import Post from '../../../models/post.js';
import server from '../../../server.js';
import { validCategories } from '../../../utils/constants.js';

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
afterAll(async () => {
  await mongoose.disconnect();
});
let postId;
const invalidPostId = '609c16c69405b14574c99999';
describe('Integration Tests: Post creation', () => {
  it('Post creation: Success - All fields are valid', async () => {
    const response = await request(server).post('/api/posts').send(createPostObject());
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    postId = response.body._id;

    const fetchedPost = await Post.findById(postId);
    expect(fetchedPost).not.toBeNull();
    expect(fetchedPost.title).toBe(createPostObject().title);
  });

  it('Post creation: Failure - Missing required fields', async () => {
    const postObject = createPostObject();
    delete postObject.title;
    const response = await request(server).post('/api/posts').send(postObject);

    expect(JSON.parse(response.text)).toEqual({ message: 'All fields are required.' });
    expect(response.status).toBe(400);
  });

  it('Post creation: Failure - Invalid category count', async () => {
    const postObject = createPostObject({
      categories: [validCategories[0], validCategories[1], validCategories[2], validCategories[3]],
    });
    const response = await request(server).post('/api/posts').send(postObject);

    expect(JSON.parse(response.text)).toEqual({
      message: 'Please select up to three categories only.',
    });
    expect(response.status).toBe(400);
  });

  it('Post creation: Failure - Invalid image URL format', async () => {
    const postObject = createPostObject({
      imageLink: 'https://www.invalid-image.gif',
    });
    const response = await request(server).post('/api/posts').send(postObject);

    expect(JSON.parse(response.text)).toEqual({
      message: 'Image URL must end with .jpg, .jpeg, or .png',
    });
    expect(response.status).toBe(400);
  });

  it('Post creation: Failure - Internal server error', async () => {
    // Mocking a scenario where the server encounters an internal error during post creation
    jest.spyOn(Post.prototype, 'save').mockRejectedValueOnce(new Error('Internal Server Error'));

    const postObject = createPostObject();
    const response = await request(server).post('/api/posts').send(postObject);

    expect(response.status).toBe(500);
    expect(JSON.parse(response.text)).toEqual({ message: 'Internal Server Error' });
  });
});
describe('Integration Tests: Get all posts', () => {
  it('Get all posts: Success', async () => {
    const response = await request(server).get('/api/posts');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
describe('Integration Tests: Get all posts by category', () => {
  it('Get all posts by category: Success', async () => {
    const category = validCategories[0];
    const response = await request(server).get(`/api/posts/categories/${category}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Get all posts by category: Failure - Invalid category', async () => {
    const category = 'invalid-category';
    const response = await request(server).get(`/api/posts/categories/${category}`);

    expect(response.status).toBe(400);
    expect(JSON.parse(response.text)).toEqual({
      message: 'Invalid category',
    });
  });
});
describe('Integration Tests: Get all featured posts', () => {
  it('Get all featured posts: Success', async () => {
    const responseFeatured = await request(server).get('/api/posts/featured');
    const responseLatest = await request(server).get('/api/posts/latest');

    expect(responseFeatured.status).toBe(200);
    expect(responseLatest.status).toBe(200);
    expect(responseFeatured.body).toBeInstanceOf(Array);
    expect(responseLatest.body).toBeInstanceOf(Array);
  });
});
describe('Integration Tests: Get all latest posts', () => {
  it('Get all latest posts: Success', async () => {
    const responseFeatured = await request(server).get('/api/posts/featured');
    const responseLatest = await request(server).get('/api/posts/latest');

    expect(responseFeatured.status).toBe(200);
    expect(responseLatest.status).toBe(200);
    expect(responseFeatured.body).toBeInstanceOf(Array);
    expect(responseLatest.body).toBeInstanceOf(Array);
  });
});
describe('Integration Tests: Update Post', () => {
  it('Update Post: Success - Update Post of existing ID', async () => {
    const response = await request(server)
      .patch(`/api/posts/${postId}`)
      .send(createPostObject({ title: 'Updated Post' }));

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id', postId);
    const updatedPost = await Post.findById(postId);
    expect(updatedPost).not.toBeNull();
    expect(updatedPost.title).toBe('Updated Post');
  });

  it('Update Post: Failure - Invalid post ID', async () => {
    const response = await request(server)
      .patch(`/api/posts/${invalidPostId}`)
      .send(createPostObject({ title: 'Updated Post' }));

    expect(response.status).toBe(404);
    expect(JSON.parse(response.text)).toEqual({
      message: 'Post not found',
    });
  });
});
describe('Integration Tests: Delete Post', () => {
  it('Delete Post: Success - Removing Post with specific ID', async () => {
    const response = await request(server).delete(`/api/posts/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Post deleted');
    const deletedPost = await Post.findById(postId);
    expect(deletedPost).toBeNull();
  });

  it('Delete Post: Failure - Invalid post ID', async () => {
    const response = await request(server).delete(`/api/posts/${invalidPostId}`);

    expect(response.status).toBe(404);
    expect(JSON.parse(response.text)).toEqual({
      message: 'Post not found',
    });
  });
});
