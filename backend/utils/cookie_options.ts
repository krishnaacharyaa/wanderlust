import { ACCESS_COOKIE_MAXAGE, NODE_ENV } from '../config/utils';
const defaultMaxAge = 3600000;
interface CookieObject {
  httpOnly: boolean;
  sameSite: 'lax' | 'strict' | 'none';
  secure: boolean;
  maxAge?: number | undefined;
}
const maxAge =
  typeof ACCESS_COOKIE_MAXAGE === 'string' ? parseInt(ACCESS_COOKIE_MAXAGE, 10) : defaultMaxAge;

const validMaxAge = isNaN(maxAge) ? defaultMaxAge : maxAge;
export const cookieOptions: CookieObject = {
  httpOnly: true,
  sameSite: NODE_ENV === 'Development' ? 'lax' : 'none',
  secure: NODE_ENV === 'Development' ? false : true,
  maxAge: validMaxAge,
};