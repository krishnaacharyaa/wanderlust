import { ACCESS_COOKIE_MAXAGE, NODE_ENV } from '../config/utils.js';

export const cookieOptions = {
  httpOnly: true,
  sameSite: NODE_ENV === "Development" ? "lax" : "strict",
  secure: NODE_ENV === "Development" ? false : true,
  maxAge: ACCESS_COOKIE_MAXAGE,
};
