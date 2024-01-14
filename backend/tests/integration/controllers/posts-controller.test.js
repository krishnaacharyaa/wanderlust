import mongoose from 'mongoose';
import request from 'supertest';
import Post from '../../../models/post.js';
import server from '../../../server.js';
import { validCategories, HTTP_STATUS, RESPONSE_MESSAGES } from '../../../utils/constants.js';
import { createPostObject } from '../../utils/helper-objects.js';

afterAll(async () => {
  await mongoose.disconnect();
});

let postId;
const invalidPostId = '609c16c69405b14574c99999';
describe('Integration Tests: Post creation', () => {
  it('Post creation: Success - All fields are valid', async () => {
    const response = await request(server).post('/api/posts').send(createPostObject());
    postId = response.body._id;
    const fetchedPost = await Post.findById(postId);

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toHaveProperty('_id');
    expect(fetchedPost).not.toBeNull();
    expect(fetchedPost.title).toBe(createPostObject().title);
  });

  it('Post creation: Failure - Missing required fields', async () => {
    const postObject = createPostObject();
    delete postObject.title;
    const response = await request(server).post('/api/posts').send(postObject);

    expect(JSON.parse(response.text)).toEqual({ message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS });
    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
  });

  it('Post creation: Failure - Invalid category count', async () => {
    const postObject = createPostObject({
      categories: [validCategories[0], validCategories[1], validCategories[2], validCategories[3]],
    });
    const response = await request(server).post('/api/posts').send(postObject);

    expect(JSON.parse(response.text)).toEqual({
      message: RESPONSE_MESSAGES.POSTS.MAX_CATEGORIES,
    });
    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
  });

  it('Post creation: Failure - Invalid image URL format', async () => {
    const postObject = createPostObject({
      imageLink: 'https://www.invalid-image.gif',
    });
    const response = await request(server).post('/api/posts').send(postObject);

    expect(JSON.parse(response.text)).toEqual({
      message: RESPONSE_MESSAGES.POSTS.INVALID_IMAGE_URL,
    });
    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
  });

  it('Post creation: Failure - Internal server error', async () => {
    // Mocking a scenario where the server encounters an internal error during post creation
    jest.spyOn(Post.prototype, 'save').mockRejectedValueOnce(new Error(RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR));

    const postObject = createPostObject();
    const response = await request(server).post('/api/posts').send(postObject);

    expect(response.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(JSON.parse(response.text)).toEqual({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  });
});
describe('Integration Tests: Get all posts', () => {
  it('Get all posts: Success', async () => {
    const response = await request(server).get('/api/posts');

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toBeInstanceOf(Array);
  });
});
describe('Integration Tests: Get all posts by category', () => {
  it('Get all posts by category: Success', async () => {
    const category = validCategories[0];
    const response = await request(server).get(`/api/posts/categories/${category}`);

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Get all posts by category: Failure - Invalid category', async () => {
    const category = 'invalid-category';
    const response = await request(server).get(`/api/posts/categories/${category}`);

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(JSON.parse(response.text)).toEqual({
      message: RESPONSE_MESSAGES.POSTS.INVALID_CATEGORY,
    });
  });
});
describe('Integration Tests: Get all featured posts', () => {
  it('Get all featured posts: Success', async () => {
    const responseFeatured = await request(server).get('/api/posts/featured');

    expect(responseFeatured.status).toBe(HTTP_STATUS.OK);
    expect(responseFeatured.body.length).toBeGreaterThan(1);
  });
});
describe('Integration Tests: Get all latest posts', () => {
  it('Get all latest posts: Success', async () => {
    const responseLatest = await request(server).get('/api/posts/latest');

    expect(responseLatest.status).toBe(HTTP_STATUS.OK);
    expect(responseLatest.body.length).toBeGreaterThan(1);
  });
});
describe('Integration Tests: Update Post', () => {
  it('Update Post: Success - Update Post of existing ID', async () => {
    let updatedPost;

    const response = await request(server)
      .patch(`/api/posts/${postId}`)
      .send(createPostObject({ title: 'Updated Post' }));
    updatedPost = await Post.findById(postId);

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(updatedPost).not.toBeNull();
    expect(updatedPost.title).toBe('Updated Post');
  });

  it('Update Post: Failure - Invalid post ID', async () => {
    const response = await request(server)
      .patch(`/api/posts/${invalidPostId}`)
      .send(createPostObject({ title: 'Updated Post' }));

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(JSON.parse(response.text)).toEqual({
      message: RESPONSE_MESSAGES.POSTS.NOT_FOUND,
    });
  });
});
describe('Integration Tests: Delete Post', () => {
  it('Delete Post: Success - Removing Post with specific ID', async () => {
    let deletedPost;

    const response = await request(server).delete(`/api/posts/${postId}`);

    deletedPost = await Post.findById(postId);

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toHaveProperty('message', RESPONSE_MESSAGES.POSTS.DELETED);
    expect(deletedPost).toBeNull();
  });

  it('Delete Post: Failure - Invalid post ID', async () => {
    const response = await request(server).delete(`/api/posts/${invalidPostId}`);

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(JSON.parse(response.text)).toEqual({
      message: RESPONSE_MESSAGES.POSTS.NOT_FOUND,
    });
  });
});
