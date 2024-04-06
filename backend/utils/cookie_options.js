export const accessCookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: process.env.ACCESS_COOKIE_MAXAGE, 
};
export const refreshCookieOptions = {
  httpOnly: true,
  sameSite: 'none',
  secure: true,
  maxAge: process.env.REFRESH_COOKIE_MAXAGE, 
};
