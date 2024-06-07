import { ACCESS_COOKIE_MAXAGE, NODE_ENV } from '../config/utils';
import { CookieOptions } from 'express-serve-static-core';

export const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: NODE_ENV === 'Development' ? 'lax' : 'none',
  secure: NODE_ENV === 'Development' ? false : true,
  maxAge: Number(ACCESS_COOKIE_MAXAGE),
};
