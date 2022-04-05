/* eslint-disable consistent-return */
import express from 'express';
import { IUser, authJWTName } from '../models/user';
import { createUser, retrieveUser } from '../services/user.service';
import passport from 'passport';

const login = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (req.isAuthenticated()) {
    res.status(400).send({ message: 'Already logged in' }); // Already logged in
  }
  passport.authenticate(
    'local',
    {
      failureMessage: true,
    },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(404).send(info);
      }
      req.logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).send({ Message: 'Successful Login' });
      });
    },
  )(req, res, next);
};

const logout = async (req: express.Request, res: express.Response) => {
  // Logout with Passport which modifies the request object
  req.logout();
  // Only if there is an active session.
  if (req.session) {
    // Delete session object
    req.session.destroy((e) => {
      if (e) {
        res.status(400).send({ message: 'Unable to log out', error: e });
      } else {
        res.send({ logout: true });
      }
    });
  }
};

const register = async (req: express.Request, res: express.Response) => {
  const { email, password } = req.body;
  // if (req.isAuthenticated()) {
  //   res.status(400).send({ message: 'Already logged in' }); // Already logged in
  // }
  // Check if user exists
  const user: IUser | null = await retrieveUser(email);
  if (user) {
    res.status(400).send({
      message: `User with email ${email} already has an account.`,
    });
    return;
  }
  // Create user
  return createUser(email, password)
    .then(() => res.sendStatus(201))
    .catch((e) => {
      console.log(e);
      res.status(400).send({ message: e });
    });
};

const approve = async (req: express.Request, res: express.Response) => {
  res.sendStatus(200);
};

export { login, logout, register, approve };
