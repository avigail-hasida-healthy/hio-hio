import express, { Router } from "express";
import { handleRequest } from "@hio-hio/middleware";
import { createUser, getUser, verifyUser } from "../handlers";

let usersRouter: Router;

/**
 * Setup the users routes and returns the express router
 * @returns the express router
 */
export const setupRouter = () => {
  if (usersRouter) {
    return usersRouter;
  }

  usersRouter = express.Router();

  /**
   * @openapi
   * /users/:
   *   post:
   *     summary: Create user
   *     description: Create a new user
   *     operationId: createUser
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - password
   *             properties:
   *               name:
   *                 type: string
   *                 description: The user's name
   *                 example: john.doe
   *               password:
   *                 type: string
   *                 description: The password
   *                 example: don't tell me
   *     responses:
   *       201:
   *         description: The created user.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   format: uuid
   *                   description: The user Id
   *                   example: a09e386b-371d-4c33-9e96-134a69d2904e
   *                 name:
   *                   type: string
   *                   description: The user name
   *                   example: john.doe
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  usersRouter.post(
    "",
    handleRequest(createUser.requestToDto, createUser.handler, 201)
  );

  /**
   * @openapi
   * /users/verify:
   *   post:
   *     summary: Verify user
   *     description: Verify user credentials
   *     operationId: verifyUser
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - password
   *             properties:
   *               name:
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
  usersRouter.post(
    "/verify",
    handleRequest(verifyUser.requestToDto, verifyUser.handler, 200)
  );

  /**
   * @openapi
   * /users/{id}:
   *   get:
   *     summary: Get user
   *     description: Get user by id
   *     operationId: getUser
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         description: The user id to get
   *         schema:
   *           type: string
   *           format: uuid
   *         required: true
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
  usersRouter.get(
    "/:id",
    handleRequest(getUser.requestToDto, getUser.handler, 200)
  );

  return usersRouter;
};

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The user id
 *           example: 7db06643-f0d7-4f5d-8dc5-60b45acecb41
 *         name:
 *           type: string
 *           description: The user name.
 *           example: john.doe
 * tags:
 *   - name: Hios
 */
