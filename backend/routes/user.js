import { Router } from 'express';
import { adminHandler, authenticationHandler } from '../middlewares/auth-middleware.js';
import {
  changeUserRoleHandler,
  deleteUserHandler,
  getAllUserHandler,
} from '../controllers/user-controller.js';

const router = Router();

// get all users
router.get('/', authenticationHandler, adminHandler, getAllUserHandler);

// change user role
router.patch('/:userId', authenticationHandler, adminHandler, changeUserRoleHandler);

// delete the user
router.delete('/:userId', authenticationHandler, adminHandler, deleteUserHandler);

export default router;
