import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.js';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, BACKEND_URL } from './utils.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID!,
      clientSecret: GOOGLE_CLIENT_SECRET!,
      callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      try {
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value || '';

          let fullName = profile.displayName || '';
          if (fullName.length > 15) {
            fullName = fullName.slice(0, 15);
          }

          let userName = email.split('@')[0] || fullName.replace(/\s+/g, '').toLowerCase();

          let existingUser = await User.findOne({ userName });
          let counter = 1;
          while (existingUser) {
            userName = `${email.split('@')[0] || fullName.replace(/\s+/g, '').toLowerCase()}${counter}`;
            existingUser = await User.findOne({ userName });
            counter++;
          }

          user = new User({
            googleId: profile.id,
            email,
            fullName,
            userName,
            avatar: profile.photos?.[0]?.value || '',
          });

          await user.save();
        }

        done(null, user);
      } catch (err) {
        console.error('Google OAuth error:', err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    console.error('Deserialize user error:', err);
    done(err, null);
  }
});

export default passport;
