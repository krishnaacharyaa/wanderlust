import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import { cookieOptions } from '../utils/cookie_options.js';
import { JWT_SECRET } from '../config/utils.js';
const { sign } = jwt;
import { ApiError } from '../utils/api-error.js';
import { ApiResponse } from '../utils/api-response.js';
import { asyncHandler } from '../utils/async-handler.js';

//REGULAR EMAIL PASSWORD STRATEGY
//1.Sign Up
export const signUpWithEmail = asyncHandler(async (req, res) => {
  const { userName, fullName, email, password } = req.body;
  if (!userName || !fullName || !email || !password) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS)
  }

  const existingUser = await User.findOne({ 
    $or: [{ userName }, { email }] 
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
    password
  })

  try {
    await user.validate()
  } catch (error) {
    const validationErrors = [];
    for (const key in error.errors) {
      validationErrors.push(error.errors[key].message);
    }
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, validationErrors.join(', '));
  }

  const accessToken = await user.generateAccessToken()
  const refreshToken = await user.generateRefreshToken()

  user.refreshToken = refreshToken

  await user.save()
  user.password = undefined

  res
    .status(HTTP_STATUS.OK)
    .cookie('access_token', accessToken, cookieOptions)
    .cookie('refresh_token', refreshToken, cookieOptions)
    .json(new ApiResponse(HTTP_STATUS.OK, {
      accessToken,
      refreshToken,
      user
    }, RESPONSE_MESSAGES.USERS.SIGNED_UP))

});

//2.Sign In
export const signInWithEmailOrUsername = asyncHandler(async (req, res) => {
  const { userNameOrEmail, password } = req.body;
  if (!userNameOrEmail || !password) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.COMMON.REQUIRED_FIELDS);
  }

  const user = await User.findOne({
    $or: [{ email: userNameOrEmail }, { userName: userNameOrEmail }]
  }).select("+password")

  if (!user) {
    throw new ApiError(HTTP_STATUS.BAD_REQUEST, RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS);
  }

  const isCorrectPassword = await user.isPasswordCorrect(password)

  if (!isCorrectPassword) {
    throw new ApiError(HTTP_STATUS.UNAUTHORIZED, RESPONSE_MESSAGES.USERS.INVALID_PASSWORD)
  }
  const accessToken = await user.generateAccessToken()
  const refreshToken = await user.generateRefreshToken()

  user.refreshToken = refreshToken
  await user.save()
  user.password = undefined

  res
    .status(HTTP_STATUS.OK)
    .cookie('access_token', accessToken, cookieOptions)
    .cookie('refresh_token', refreshToken, cookieOptions)
    .json(new ApiResponse(HTTP_STATUS.OK, {
      accessToken,
      refreshToken,
      user
    }, RESPONSE_MESSAGES.USERS.SIGNED_IN))

});

//GOOGLE STRTEGY
//1.Open google auth window
export const openGoogleAuthWindow = (req, res, next) => {
  const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth?';
  const params = new URLSearchParams({
    client_id: process.env.GAUTH_CLIENT_ID,
    redirect_uri: process.env.REDIRECTION_URL,
    state: 'google-auth-provider',
    scope: 'profile email',
    response_type: 'code',
  });

  res.redirect(googleAuthUrl + params.toString());
};

//2.Sign Up
export const signUpWithGoogle = async (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: RESPONSE_MESSAGES.USERS.CODE_NOT_FOUND,
    });
  }
  const tokenUrl = process.env.GAUTH_TOKEN_URL;
  try {
    const tokenResponse = await axios.post(
      tokenUrl,
      {
        client_id: process.env.GAUTH_CLIENT_ID,
        client_secret: process.env.GAUTH_CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECTION_URL,
        grant_type: 'authorization_code',
      },
      {
        headers: { Accept: 'application/json' },
      }
    );
    const userInfo = await axios.get(process.env.GAUTH_USER_URL, {
      headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
    });
    const { email, name } = userInfo.data;
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      throw new Error(RESPONSE_MESSAGES.USERS.EMAIL_ALREADY_IN_USE);
    }
    const newUser = await User.create({
      name,
      email,
    });
    const payload = { name, _id: newUser._id };
    const accessToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    res.cookie('access_token', accessToken, accessCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshCookieOptions);
    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: RESPONSE_MESSAGES.USERS.SIGNED_UP,
      user: {
        name: name,
        id: newUser._id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

//3.Sign In
export const signInWithGoogle = async (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: RESPONSE_MESSAGES.USERS.CODE_NOT_FOUND,
    });
  }
  const tokenUrl = process.env.GAUTH_TOKEN_URL;
  try {
    const tokenResponse = await axios.post(
      tokenUrl,
      {
        client_id: process.env.GAUTH_CLIENT_ID,
        client_secret: process.env.GAUTH_CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECTION_URL,
        grant_type: 'authorization_code',
      },
      {
        headers: { Accept: 'application/json' },
      }
    );
    const userInfo = await axios.get(process.env.GAUTH_USER_URL, {
      headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
    });
    const { email, name } = userInfo.data;
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      throw new Error(RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS);
    }
    const payload = { name, _id: isUserExists._id };
    const accessToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    res.cookie('access_token', accessToken, accessCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshCookieOptions);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: RESPONSE_MESSAGES.USERS.SIGNED_IN,
      user: {
        name: name,
        id: isUserExists._id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

//GITHUB STRATEGY
//1.Open Github auth window
export const openGithubAuthWindow = (req, res, next) => {
  const githubAuthUrl = 'https://github.com/login/oauth/authorize?';
  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.REDIRECTION_URL,
    state: 'github-auth-provider',
    scope: 'user:read user:email',
    response_type: 'code',
  });

  res.redirect(githubAuthUrl + params.toString());
};

//2.Sign up
export const signUpWithGithub = async (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: RESPONSE_MESSAGES.USERS.CODE_NOT_FOUND,
    });
  }
  const tokenUrl = process.env.GITHUB_TOKEN_URL;
  try {
    const tokenResponse = await axios.post(
      tokenUrl,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );
    const userInfo = await axios.get(process.env.GITHUB_USER_URL, {
      headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
    });
    if (userInfo.data.email == null) {
      throw new Error("Your github account's email is not publically available.");
    }
    const { name, email } = userInfo.data;
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      throw new Error(RESPONSE_MESSAGES.USERS.EMAIL_ALREADY_IN_USE);
    }
    const newUser = await User.create({
      name,
      email,
    });
    const payload = { name, _id: newUser._id };
    const accessToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    res.cookie('access_token', accessToken, accessCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshCookieOptions);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: RESPONSE_MESSAGES.USERS.SIGNED_UP,
      user: {
        name,
        id: newUser._id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

//3.Sign In
export const signInWithGithub = async (req, res, next) => {
  const code = req.query.code;
  if (!code) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      success: false,
      message: RESPONSE_MESSAGES.USERS.CODE_NOT_FOUND,
    });
  }
  const tokenUrl = process.env.GITHUB_TOKEN_URL;
  try {
    const tokenResponse = await axios.post(
      tokenUrl,
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: 'application/json' },
      }
    );
    const userInfo = await axios.get(process.env.GITHUB_USER_URL, {
      headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` },
    });
    const { name, email } = userInfo.data;
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      throw new Error(RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS);
    }
    const payload = { name, _id: isUserExists._id };
    const accessToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    });
    res.cookie('access_token', accessToken, accessCookieOptions);
    res.cookie('refresh_token', refreshToken, refreshCookieOptions);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: RESPONSE_MESSAGES.USERS.SIGNED_IN,
      user: {
        name,
        id: isUserExists._id,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

//Sign Out
export const signOutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        refreshToken: ''
      }
    },
    {
      new: true
    }
  )

  res
    .status(HTTP_STATUS.OK)
    .clearCookie("access_token", cookieOptions)
    .clearCookie("refresh_token", cookieOptions)
    .json(
      new ApiResponse(HTTP_STATUS.OK, '', RESPONSE_MESSAGES.USERS.SIGNED_OUT)
    )
});

// check user
export const isLoggedIn = asyncHandler(async (req, res) => {
  let access_token = req.cookies?.access_token
  let refresh_token = req.cookies?.refresh_token
  const { _id } = req.params

  if (access_token) {
    try {
      await jwt.verify(access_token, JWT_SECRET)
      return res.status(HTTP_STATUS.OK).json(
        new ApiResponse(HTTP_STATUS.OK, access_token, RESPONSE_MESSAGES.USERS.VALID_TOKEN)
      )
    } catch (error) {
      // Access token invalid, proceed to check refresh token
    }
  }
  else if (refresh_token) {
    try {
      await jwt.verify(refresh_token, JWT_SECRET)
      access_token = await user.generateAccessToken()
      return res
        .status(HTTP_STATUS.OK)
        .cookie('access_token', access_token, cookieOptions)
        .json(
          new ApiResponse(HTTP_STATUS.OK, access_token, RESPONSE_MESSAGES.USERS.VALID_TOKEN)
        )
    } catch (error) {
      // Access token invalid, proceed to check refresh token that is in db
    }
  }
  const user = await User.findById(_id)
  if (!user) {
    return res.status(HTTP_STATUS.NOT_FOUND).json(
      new ApiResponse(HTTP_STATUS.NOT_FOUND, '', RESPONSE_MESSAGES.USERS.USER_NOT_EXISTS)
    )
  }

  const { refreshToken } = user

  if (!refreshToken) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(
      new ApiResponse(HTTP_STATUS.UNAUTHORIZED, '', RESPONSE_MESSAGES.USERS.INVALID_TOKEN)
    )
  }

  try {
    await jwt.verify(refreshToken, JWT_SECRET)
    access_token = await user.generateAccessToken()
    refresh_token = await user.generateRefreshToken()

    user.refreshToken = refresh_token
    await user.save()
    return res
      .status(HTTP_STATUS.OK)
      .cookie('access_token', access_token, cookieOptions)
      .cookie('refresh_token', refresh_token, cookieOptions)
      .json(
        new ApiResponse(HTTP_STATUS.OK, access_token, RESPONSE_MESSAGES.USERS.VALID_TOKEN)
      )
  } catch (error) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json(
      new ApiResponse(HTTP_STATUS.UNAUTHORIZED, '', RESPONSE_MESSAGES.USERS.INVALID_TOKEN)
    )
  }
});