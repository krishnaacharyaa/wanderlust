import dotenv from 'dotenv';

dotenv.config();

type TokenExpiry = '15m' | '30m' | '1h' | '2h' | '1d' | '7d' | '30d';

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const REDIS_URL = process.env.REDIS_URL;
const ACCESS_COOKIE_MAXAGE = process.env.ACCESS_COOKIE_MAXAGE;
const REFRESH_COOKIE_MAXAGE = process.env.REFRESH_COOKIE_MAXAGE;

const ACCESS_TOKEN_EXPIRES_IN: TokenExpiry = process.env.ACCESS_TOKEN_EXPIRES_IN as TokenExpiry;
const REFRESH_TOKEN_EXPIRES_IN: TokenExpiry = process.env.REFRESH_TOKEN_EXPIRES_IN as TokenExpiry;
const JWT_SECRET: string = process.env.JWT_SECRET ?? throwError('JWT_SECRET is not defined');
const FRONTEND_URL = process.env.FRONTEND_URL;
const NODE_ENV = process.env.NODE_ENV;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const BACKEND_URL = process.env.BACKEND_URL;
function throwError(message: string): never {
  throw new Error(message);
}

export {
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
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  BACKEND_URL,
};
