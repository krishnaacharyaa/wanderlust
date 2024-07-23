import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails && profile.emails[0] ? profile.emails[0].value : '';
          let fullName = profile.displayName || '';
          if (fullName.length > 15) {
            fullName = fullName.slice(0, 15); // Ensure fullName is less than 15 characters
          }
          const userName = email.split('@')[0] || fullName.replace(/\s+/g, '').toLowerCase();

          user = new User({
            googleId: profile.id,
            email,
            fullName,
            userName,
            avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
          });

          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
