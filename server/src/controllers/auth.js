import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from './../models/user';
import conf from '../services/config';
const { accessTokenSecret } = conf;

const registerController = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.errors[0].msg);
  }

  const { firstName, lastName, username, password } = req.body;
  // Check for existing user
  const user = await User.findOne({ username });
  if (user) {
    return res.send({
      status: 400,
      message: 'Username already exists.',
      errorCode: 'FAILURE'
    });
  }

  try {
    const userInfo = {
      username,
      password: await argon2.hash(password)
    };

    if (firstName)  userInfo.firstName = firstName;
    if (lastName) userInfo.lastName = lastName;

    const newUser = new User(userInfo);
    await newUser.save();
  } catch(err) {
    return res.send({
      status: 500,
      message: 'Internal server error.',
      errorCode: 'FAILURE'
    });
  }

  return res.send({
    status: 200,
    message: 'You are registered successfully!',
  });
};

const loginController = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send(errors.errors[0].msg);
  }

  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.send({
        status: 400,
        message: 'Incorrect username or password!',
        errorCode: 'FAILURE'
      });
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      res.send({
        status: 400,
        message: 'Incorrect username or password!',
        errorCode: 'FAILURE'
      });
    }

    const accessToken = jwt.sign({ userId: user._id }, accessTokenSecret, { expiresIn: '1.5h' });

    return res.send({
      status: 200,
      data: { accessToken },
      message: 'Logged in successfully!',
    });
  } catch(err) {
    return res.send({
      status: 500,
      message: 'Internal server error.',
      errorCode: 'FAILURE'
    });
  }
};

module.exports = {
  registerController,
  loginController
};