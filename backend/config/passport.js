import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Configure passport with Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID, // Ensure this is correctly defined
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Ensure this is correctly defined
      callbackURL: '/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // Your verification logic here
      return done(null, profile);
    }
  )
);

export default passport;
