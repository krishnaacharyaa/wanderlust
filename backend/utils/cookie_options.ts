export const accessCookieOptions = {
  httpOnly: true,
  sameSite: 'none' as const, // to ensure that TypeScript treats 'none' as a literal type compatible with 'sameStie'
  secure: true,
  maxAge: Number(process.env.ACCESS_COOKIE_MAXAGE) ?? 3600000 // Fallback to 1 hour if undefined 
};
export const refreshCookieOptions = {
  httpOnly: true,
  sameSite: 'none' as const,
  secure: true,
  maxAge: Number(process.env.REFRESH_COOKIE_MAXAGE) ?? 7200000, // Fallback to 2 hours if undefined
};
