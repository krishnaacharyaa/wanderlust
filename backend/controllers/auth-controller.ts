import User from '../models/user';
import jwt from 'jsonwebtoken';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants';
import { cookieOptions } from '../utils/cookie_options';
import { JWT_SECRET } from '../config/utils';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { Response, Request } from 'express';
import { RequestWithUserRole } from '../types/request-User-Type';

//REGULAR EMAIL PASSWORD STRATEGY
//1.Sign Up
export const signUpWithEmail = asyncHandler(async (req: Request, res: Response) => {
  const { userName, fullName, email, password } = req.body;
  if (!userName || !fullName || !email || !password) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS);
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    if (existingUser.userName === userName) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.USER_USERNAME_EXISTS);
    }
    if (existingUser.email === email) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.USER_EMAIL_EXISTS);
    }
  }

  const user = new User({
    userName,
    fullName,
    email,
    password,
  });

  try {
    await user.validate();
  } catch (error) {
    if (error instanceof ApiError) {
      const validationErrors = [];
      for (const key in error.errors) {
        validationErrors.push(error.errors[key].message);
      }
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, validationErrors.join(', '));
    } else {
      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        RESPONSE_MESSAGES.COMMON.INTERNAL_SERVER_ERROR
      );
    }
  }

  const accessToken: string = await user.generateAccessToken();
  const refreshToken: string = await user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save();
  // user.password = undefined;

  res
    .status(HTTP_STATUS.OK)
    .cookie('access_token', accessToken, cookieOptions)
    .cookie('refresh_token', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        {
          accessToken,
          refreshToken,
          user,
        },
        RESPONSE_MESSAGES.USERS.SIGNED_UP
      )
    );
});

//2.Sign In
export const signInWithEmailOrUsername = asyncHandler(async (req, res) => {
  const { userNameOrEmail, password } = req.body;
  if (!userNameOrEmail || !password) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS);
  }

  const user = await User.findOne({
    $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
  }).select('+password');

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS);
  }

  const isCorrectPassword = await user.isPasswordCorrect(password);

  if (!isCorrectPassword) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.USERS.INVALID_PASSWORD);
  }
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();

  res
    .status(HTTP_STATUS.OK)
    .cookie('access_token', accessToken, cookieOptions)
    .cookie('refresh_token', refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        HTTP_STATUS.OK,
        {
          accessToken,
          refreshToken,
          user,
        },
        RESPONSE_MESSAGES.USERS.SIGNED_IN
      )
    );
});

//Sign Out
export const signOutUser = asyncHandler(async (req: RequestWithUserRole, res: Response) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: '',
      },
    },
    {
      new: true,
    }
  );

  res
    .status(HTTP_STATUS.OK)
    .clearCookie('access_token', cookieOptions)
    .clearCookie('refresh_token', cookieOptions)
    .json(new ApiResponse(HTTP_STATUS.OK, '', RESPONSE_MESSAGES.USERS.SIGNED_OUT));
});

// check user
export const isLoggedIn = asyncHandler(async (req, res) => {
  let access_token = req.cookies?.access_token;
  let refresh_token = req.cookies?.refresh_token;
  const { _id } = req.params;

  const user = await User.findById(_id);
  if (!user) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json(new ApiResponse(HTTP_STATUS.NOT_FOUND, '', RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS));
  }
  if (access_token) {
    try {
      await jwt.verify(access_token, JWT_SECRET!);
      return res
        .status(HTTP_STATUS.OK)
        .json(new ApiResponse(HTTP_STATUS.OK, access_token, RESPONSE_MESSAGES.USERS.VALID_TOKEN));
    } catch (error) {
      // Access token invalid, proceed to check refresh token
      console.log(error);
    }
  } else if (refresh_token) {
    try {
      await jwt.verify(refresh_token, JWT_SECRET!);
      access_token = await user.generateAccessToken();
      return res
        .status(HTTP_STATUS.OK)
        .cookie('access_token', access_token, cookieOptions)
        .json(new ApiResponse(HTTP_STATUS.OK, access_token, RESPONSE_MESSAGES.USERS.VALID_TOKEN));
    } catch (error) {
      // Access token invalid, proceed to check refresh token that is in db
      console.log(error);
    }
  }

  const { refreshToken } = user;

  if (!refreshToken) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json(new ApiResponse(HTTP_STATUS.UNAUTHORIZED, '', RESPONSE_MESSAGES.USERS.INVALID_TOKEN));
  }

  try {
    await jwt.verify(refreshToken, JWT_SECRET!);
    access_token = await user.generateAccessToken();
    refresh_token = await user.generateRefreshToken();

    user.refreshToken = refresh_token;
    await user.save();
    return res
      .status(HTTP_STATUS.OK)
      .cookie('access_token', access_token, cookieOptions)
      .cookie('refresh_token', refresh_token, cookieOptions)
      .json(new ApiResponse(HTTP_STATUS.OK, access_token, RESPONSE_MESSAGES.USERS.VALID_TOKEN));
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(
          new ApiResponse<string>(
            HTTP_STATUS.UNAUTHORIZED,
            error.message,
            RESPONSE_MESSAGES.USERS.INVALID_TOKEN
          )
        );
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: error });
    }
  }
});
