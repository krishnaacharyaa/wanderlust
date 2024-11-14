import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const options = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  REDIS_URL: process.env.REDIS_URL,
  ACCESS_COOKIE_MAXAGE: process.env.ACCESS_COOKIE_MAXAGE,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_COOKIE_MAXAGE: process.env.REFRESH_COOKIE_MAXAGE,
  REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
  NODE_ENV: process.env.NODE_ENV || 'sample',
};
logger.info(`Google strategy => Client id: ${process.env.GOOGLE_CLIENT_ID}`);
logger.info(`Configurations vairables: ${JSON.stringify(options)}`);

export const {
  MONGODB_URI,
  PORT,
  REDIS_URL,
  ACCESS_COOKIE_MAXAGE,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_COOKIE_MAXAGE,
  REFRESH_TOKEN_EXPIRES_IN,
  JWT_SECRET,
  FRONTEND_URL,
  NODE_ENV,
} = options;
