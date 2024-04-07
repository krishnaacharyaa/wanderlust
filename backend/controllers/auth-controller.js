import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../utils/constants.js';
import { accessCookieOptions, refreshCookieOptions } from '../utils/cookie_options.js';
const { hash, compareSync } = bcrypt;
const { sign } = jwt;

//REGULAR EMAIL PASSWORD STRATEGY
//1.Sign Up
export const signUpWithEmail = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error('All fields are required.');
    }
    const isExisitsUser = await User.findOne({ email });
    if (isExisitsUser) {
      throw new Error('User already exists.');
    }
    const hashedPassword = await hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    const accessToken = sign({ name, _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    });
    const refreshToken = sign({ name, _id: newUser._id }, process.env.JWT_SECRET, {
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

//2.Sign In
export const signInWithEmail = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Both email and password are required');
    }
    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      throw new Error('Email does not exist');
    }
    let accessToken;
    let refreshToken;
    if (isUserExists && compareSync(password, isUserExists.password)) {
      accessToken = sign(
        { name: isUserExists.name, _id: isUserExists._id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
        }
      );
      refreshToken = sign(
        { name: isUserExists.name, _id: isUserExists._id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
      );
      res.cookie('access_token', accessToken, accessCookieOptions);
      res.cookie('refresh_token', refreshToken, refreshCookieOptions);
    } else {
      throw new Error('Invalid password');
    }
    res.status(HTTP_STATUS.OK).json({
      success: true,
      user: {
        name: isUserExists.name,
        _id: isUserExists._id,
      },
      accessToken,
      refreshToken,
      message: RESPONSE_MESSAGES.USERS.SIGNED_IN,
    });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

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
export const signOutUser = async (req, res, next) => {
  try {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });

    res.status(200).json({ success: true, message: RESPONSE_MESSAGES.USERS.SIGNED_OUT });
  } catch (error) {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};
