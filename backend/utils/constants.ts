export const validCategories = [
  'Travel',
  'Nature',
  'City',
  'Adventure',
  'Beaches',
  'Landmarks',
  'Mountains',
];
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
export const RESPONSE_MESSAGES = {
  COMMON: {
    INTERNAL_SERVER_ERROR: 'Internal Server Error',
    REQUIRED_FIELDS: 'All fields are required.',
    SOMETHING_WRONG: 'Something went wrong',
  },
  POSTS: {
    CREATED: 'Post created successfully',
    DELETED: 'Post deleted',
    NOT_FOUND: 'Post not found',
    INVALID_CATEGORY: 'Invalid category',
    MAX_CATEGORIES: 'Please select up to three categories only',
    INVALID_IMAGE_URL: 'Image URL must end with .jpg, .jpeg, .webp, or .png',
    NOT_ALLOWED: 'You are not allowed to perform this action.',
  },
  USERS: {
    SIGNED_UP: 'New user created',
    SIGNED_IN: 'Successfully signed in',
    SIGNED_OUT: 'Successfully signed out',
    USER_EMAIL_EXISTS: 'Email already exists',
    USER_USERNAME_EXISTS: 'Username already exists',
    EMAIL_ALREADY_IN_USE: 'Email have been already used.',
    USER_NOT_EXISTS: "User don't exist",
    AUTH_CODE_NOT_FOUND: 'Something went wrong',
    INVALID_PASSWORD: 'Invalid password.',
    INVALID_TOKEN: 'Token is Invalid or expired!',
    VALID_TOKEN: 'Token is valid',
    UNAUTHORIZED_USER: 'You are not authorized!',
    RE_LOGIN: 'Please log in again',
    UPDATE: 'User updated Successfully!',
    DELETED: 'User deleted successfully!',
  },
};

export const REDIS_KEYS = {
  ALL_POSTS: 'all-posts',
  FEATURED_POSTS: 'featured-posts',
  LATEST_POSTS: 'latest-posts',
};

export const REDIS_PREFIX = 'post-cache';
