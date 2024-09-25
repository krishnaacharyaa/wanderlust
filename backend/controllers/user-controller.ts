import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import User from '../models/user.js';
import { Role } from '../types/role-type.js';
import { Request, Response } from 'express';

export const getAllUserHandler = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select('_id fullName role email');
    return res.status(HTTP_STATUS.OK).json({ users });
  } catch (error) {
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR });
  }
};

export const changeUserRoleHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;
    if (role === Role.User || role === Role.Admin) {
      const user = await User.findById(userId);
      if (!user)
        return res
          .status(HTTP_STATUS.NOT_FOUND)
          .json({ message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS });
      user.role = role;
      user.save();
    } else {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS });
    }
    return res.status(HTTP_STATUS.OK).json({ message: RESPONSE_MESSAGES.USERS.UPDATE });
  } catch (error) {
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, error: error });
  }
};

export const deleteUserHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user)
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS });
    res.status(HTTP_STATUS.NO_CONTENT).json({ message: RESPONSE_MESSAGES.USERS.DELETED });
  } catch (error) {
    console.log(error);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, error: error });
  }
};
