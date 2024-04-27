import { ACCESS_COOKIE_MAXAGE, REFRESH_COOKIE_MAXAGE } from '../config/utils.js';

export const accessCookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: ACCESS_COOKIE_MAXAGE,
};
export const refreshCookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: REFRESH_COOKIE_MAXAGE,
};