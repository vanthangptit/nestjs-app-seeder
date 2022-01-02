import express from 'express';
import { check } from 'express-validator';
import { registerController, loginController } from './../controllers/auth';

const routeAuth = express.Router();

routeAuth.get('/auth/register',
  check('username')
    .notEmpty()
    .matches(/^[a-zA-Z0-9]+([-_\.][a-zA-Z0-9]+)*[a-zA-Z0-9]$/)
    .withMessage({
      status: 400,
      message: 'Invalid username!',
      errorCode: 'FAILURE',
    }).trim().escape(),
  check('password')
    .notEmpty()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    .withMessage({
      status: 400,
      message: 'Password must contain at least one number, lower case, upper case and enter 8 or more characters.',
      errorCode: 'FAILURE',
    }),
  registerController
);

routeAuth.get('/auth/login',
  check('username')
    .notEmpty()
    .withMessage({
      status: 400,
      message: 'Invalid username!',
      errorCode: 'FAILURE',
    }),
  check('password')
    .notEmpty()
    .withMessage({
      status: 400,
      message: 'Invalid password!',
      errorCode: 'FAILURE',
    }),
  loginController
);

module.exports = routeAuth;