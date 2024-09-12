const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const { HTTP_STATUS, RESPONSE_MESSAGES } = require('../utils/constants.js');
const { cookieOptions } = require('../utils/cookie_options.js');
const { JWT_SECRET } = require('../config/utils.js');
const { ApiError } = require('../utils/api-error.js');
const { ApiResponse } = require('../utils/api-response.js');
const { asyncHandler } = require('../utils/async-handler.js');

// REGULAR EMAIL PASSWORD STRATEGY
// 1. Sign Up
const signUpWithEmail = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  if (!userName || !fullName || !email || !password) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
    });
  }

  const existingUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existingUser) {
    if (existingUser.userName === userName) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USERS.USER_USERNAME_EXISTS,
      });
    }
    if (existingUser.email === email) {
      throw new ApiError({
        status: HTTP_STATUS.BAD_REQUEST,
        message: RESPONSE_MESSAGES.USERS.USER_EMAIL_EXISTS,
      });
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
    const validationErrors = [];
    for (const key in error.errors) {
      validationErrors.push(error.errors[key].message);
    }
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      errors: validationErrors.join(', '),
    });
  }

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save();
  user.password = undefined;

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

// 2. Sign In
const signInWithEmailOrUsername = asyncHandler(async (req, res) => {
  const { userNameOrEmail, password } = req.body;
  if (!userNameOrEmail || !password) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS,
    });
  }

  const user = await User.findOne({
    $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }],
  }).select('+password');

  if (!user) {
    throw new ApiError({
      status: HTTP_STATUS.BAD_REQUEST,
      message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS,
    });
  }

  const isCorrectPassword = await user.isPasswordCorrect(password);

  if (!isCorrectPassword) {
    throw new ApiError({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: RESPONSE_MESSAGES.USERS.INVALID_PASSWORD,
    });
  }
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save();
  user.password = undefined;

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

// Sign Out
const signOutUser = asyncHandler(async (req, res, next) => {
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

  // Passport.js logout
  req.logout((err) => {
    if (err) {
      return next(
        new ApiError({
          status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
          message: 'Logout failed',
        })
      );
    }

    res
      .status(HTTP_STATUS.OK)
      .clearCookie('access_token', cookieOptions)
      .clearCookie('refresh_token', cookieOptions)
      .clearCookie('jwt', cookieOptions)
      .json(new ApiResponse(HTTP_STATUS.OK, '', RESPONSE_MESSAGES.USERS.SIGNED_OUT));
  });
});

// Check user
const isLoggedIn = asyncHandler(async (req, res) => {
  let access_token = req.cookies?.access_token;
  let refresh_token = req.cookies?.refresh_token;
  const { _id } = req.params;

  if (!_id) {
    return res
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ message: RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS });
  }

  const user = await User.findById(_id).select('userName fullName email role');

  if (!user) {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json({ message: RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS });
  }

  res.status(HTTP_STATUS.OK).json({
    user,
    access_token,
    refresh_token,
  });
});

module.exports = {
  signUpWithEmail,
  signInWithEmailOrUsername,
  signOutUser,
  isLoggedIn,
};

