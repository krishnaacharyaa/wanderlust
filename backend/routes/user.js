import { Router } from 'express';
import { isAdminMiddleware, authMiddleware } from '../middlewares/auth-middleware.js';
import {
  changeUserRoleHandler,
  deleteUserHandler,
  getAllUserHandler,
  getUserInformartion,
  updateUserHandler,
} from '../controllers/user-controller.js';

const router = Router();

// get all users
router.get('/', authMiddleware, isAdminMiddleware, getAllUserHandler);

// change user role
router.patch('/:userId', authMiddleware, isAdminMiddleware, changeUserRoleHandler);

// delete the user
router.delete('/:userId', authMiddleware, isAdminMiddleware, deleteUserHandler);

// get user  info
router.get('/:id', authMiddleware, getUserInformartion);

// update user Information
router.patch('/update/:id', authMiddleware, updateUserHandler);

export default router;
