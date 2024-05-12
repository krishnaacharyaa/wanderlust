import { Router } from 'express';
const router = Router();
import {
  signUpWithEmail,
  signInWithEmailOrUsername,
  openGoogleAuthWindow,
  signUpWithGoogle,
  signInWithGoogle,
  openGithubAuthWindow,
  signUpWithGithub,
  signInWithGithub,
  signOutUser,
  isLoggedIn,
} from '../controllers/auth-controller.js';
import { authMiddleware } from '../middlewares/auth-middleware.js';

//GOOGLE STRATEGY
router.get('/google', openGoogleAuthWindow);
router.get('/google/signup/callback', signUpWithGoogle);
router.get('/google/signin/callback', signInWithGoogle);

//GITHUB STRATEGY
router.get('/github', openGithubAuthWindow);
router.get('/github/signup/callback', signUpWithGithub);
router.get('/github/signin/callback', signInWithGithub);

//REGULAR EMAIL PASSWORD STRATEGY
router.post('/email-password/signup', signUpWithEmail);
router.post('/email-password/signin', signInWithEmailOrUsername);

//SIGN OUT
router.post('/signout', authMiddleware, signOutUser);

//CHECK USER STATUS
router.get('/check/:_id', isLoggedIn)
export default router;
