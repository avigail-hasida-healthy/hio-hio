import express, { Router } from "express";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import * as signup from "../handlers/signup";
import * as login from "../handlers/login";

let authRouter: Router;

const setupPassport = () => {
  passport.use(
    "signup",
    new localStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
        try {
          const user = await signup.signup({ username, password });
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      { usernameField: "username", passwordField: "password" },
      async (username, password, done) => {
        try {
          const user = await login.login({ username, password });

          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

/**
 * Setup the router with the auth routes
 * @returns the auth router
 */
export const setupRouter = () => {
  if (authRouter) {
    return authRouter;
  }

  setupPassport();

  authRouter = express.Router();

  /**
   * @openapi
   * /auth/signup:
   *   post:
   *     summary: Signup to Hio
   *     description: Signup to the Hio Api
   *     operationId: Signup
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 description: The user's name
   *                 example: john.doe
   *               password:
   *                 type: string
   *                 description: The password
   *                 example: don't tell me
   *     responses:
   *       200:
   *         description: The created hio.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  authRouter.post(
    "/signup",
    passport.authenticate("signup", { session: false }),
    async (req, res) => {
      res.json(req.user);
    }
  );

  /**
   * @openapi
   * /auth/login:
   *   post:
   *     summary: Login to Hio
   *     description: Login to the Hio Api
   *     operationId: Login
   *     tags:
   *       - Auth
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - username
   *               - password
   *             properties:
   *               username:
   *                 type: string
   *                 description: The user's name
   *                 example: john.doe
   *               password:
   *                 type: string
   *                 description: The password
   *                 example: don't tell me
   *     responses:
   *       200:
   *         description: The created hio.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  authRouter.post(
    "/login",
    passport.authenticate("login", { session: false }),
    async (req, res) => {
      res.json(req.user);
    }
  );

  return authRouter;
};

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: The user id
 *          example: 956366d9-79e7-4f72-8698-5c9f18e8a227
 *        username:
 *          type: string
 *          description: The user name
 *          example: john.doe
 *        token:
 *          type: string
 *          description: The signed jwt token
 *          example: TOP SECRET
 */
