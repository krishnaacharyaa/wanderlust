import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth-middleware';
import {
  signUpWithEmail,
  signInWithEmailOrUsername,
  signOutUser,
  isLoggedIn,
} from '../controllers/auth-controller';

const router = Router();

//REGULAR EMAIL PASSWORD STRATEGY
router.post('/email-password/signup', signUpWithEmail);
router.post('/email-password/signin', signInWithEmailOrUsername);

//SIGN OUT
router.post('/signout', authMiddleware, signOutUser);

//CHECK USER STATUS
router.get('/check/:_id', isLoggedIn);

export default router;
