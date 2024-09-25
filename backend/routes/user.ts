import { Router } from 'express';
import { isAdminMiddleware, authMiddleware } from '../middlewares/auth-middleware.js';
import {
  changeUserRoleHandler,
  deleteUserHandler,
  getAllUserHandler,
} from '../controllers/user-controller.js';

const router = Router();

// get all users
router.get('/', authMiddleware, isAdminMiddleware, getAllUserHandler);

// change user role
router.patch('/:userId', authMiddleware, isAdminMiddleware, changeUserRoleHandler);

// delete the user
router.delete('/:userId', authMiddleware, isAdminMiddleware, deleteUserHandler);

export default router;
