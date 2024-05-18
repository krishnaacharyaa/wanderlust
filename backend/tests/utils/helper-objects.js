import { validCategories } from '../../utils/constants';

export const res = {
  json: jest.fn(),
  status: jest.fn().mockReturnThis(),
};

export const createPostObject = (options = {}) => {
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

export const createRequestObject = (options = {}) => {
  return {
    body: options.body || {},
    params: options.params || {},
  };
};
