import { validCategories } from '../../utils/constants.js';
import { jest } from '@jest/globals';

import { Response } from 'express';

interface OptionsObject {
  _id?: string;
  title?: string;
  authorName?: string;
  imageLink?: string;
  categories?: typeof validCategories;
  description?: string;
  isFeaturedPost?: boolean;
}

export const createPostObject = (options: OptionsObject = {}): OptionsObject => {
  return {
    _id: options._id,
    title: options.title || 'Test Post',
    authorName: options.authorName || 'Test Author',
    imageLink: options.imageLink || 'https://www.forTestingPurposeOnly/my-image.jpg',
    categories: options.categories || [validCategories[0]],
    description: options.description || 'This is a test post.',
    isFeaturedPost: options.isFeaturedPost || false,
    ...options,
  };
};

interface RequestOptions {
  body?: Record<string, any>;
  params?: Record<string, any>;
}

export const createRequestObject = (
  options: RequestOptions = {}
): { body: Record<string, any>; params: Record<string, any> } => {
  return {
    body: options.body || {},
    params: options.params || {},
  };
};

export type MockResponse = {
  json: jest.Mock;
  status: jest.Mock;
};

export const res: any = {
  json: jest.fn().mockReturnThis() as unknown as Response,
  status: jest.fn().mockReturnThis() as unknown as Response,
};
