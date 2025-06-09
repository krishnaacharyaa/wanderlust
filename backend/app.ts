import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import authRouter from './routes/auth';
import postsRouter from './routes/posts';
import userRouter from './routes/user';
import errorMiddleware from './middlewares/error-middleware';
import passport from './config/passport';
import session from 'express-session';
import { FRONTEND_URL } from './config/utils';

const app = express();

app.use(
  cors({
    // added origin
    origin: [FRONTEND_URL as string, 'http://localhost:3000'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// API route
app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('Yay!! Backend of wanderlust app is now accessible');
});

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    success: false,
    message: '!Oops page not found',
  });
});

app.use(errorMiddleware);
export default app;
