import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const getAllUserHandler = async (req, res) => {
  try {
    const users = await User.find().select('_id name email');
    return res.status(HTTP_STATUS.OK).json({ users });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const changeUserRoleHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { role } = req.body;
    if (role === 'user' || role === 'admin') {
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
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, error: error });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByIdAndDelete(userId);
    if (!user)
      return res
        .status(HTTP_STATUS.NOT_FOUND)
        .json({ message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS });
    res.status(HTTP_STATUS.NO_CONTENT).json({ message: RESPONSE_MESSAGES.USERS.DELETED });
  } catch (error) {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR, error: error });
  }
};

export const getUserInformartion = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById({ _id: userId }).select('_id userName email');
    if (!user) {
      res.status(HTTP_STATUS.NOT_FOUND).json({ message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS });
    }
    return res.status(HTTP_STATUS.OK).json(user);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

export const updateUserHandler = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          userName: req.body.username,
          email: req.body.email,
          password: hashPassword,
        },
      },
      {
        new: true,
      }
    );

    res.status(HTTP_STATUS.OK).json(updatedUser);
  } catch (err) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};
