import { Router } from 'express';
const router = Router();
import {
  signUpWithEmail,
  signInWithEmail,
  openGoogleAuthWindow,
  signUpWithGoogle,
  signInWithGoogle,
  openGithubAuthWindow,
  signUpWithGithub,
  signInWithGithub,
  signOutUser,
} from '../controllers/auth-controller.js';

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
router.post('/email-password/signin', signInWithEmail);

//SIGN OUT
router.post('/signout', signOutUser);

export default router;
