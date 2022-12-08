import express, { Router } from "express";
import { handleRequest } from "@hio-hio/middleware";
import { createHio } from "../handlers";

let hiosRouter: Router;

/**
 * Setup the hios routes and returns the express router
 * @returns the express router
 */
export const setupRouter = () => {
  if (hiosRouter) {
    return hiosRouter;
  }

  hiosRouter = express.Router();

  /**
   * @openapi
   * /hios:
   *   post:
   *     summary: Create a hio
   *     description: Create a hio
   *     operationId: createHio
   *     tags:
   *       - Hios
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - userId
   *               - targetUserId
   *             properties:
   *               userId:
   *                 type: string
   *                 format: uuid
   *                 description: The user's id
   *                 example: 0a81be47-451f-49f3-8f07-29461cbda3f5
   *               targetUserId:
   *                 type: string
   *                 format: uuid
   *                 description: The target user's id
   *                 example: 4ead830a-5c05-465e-971f-bb878b36503c
   *     responses:
   *       201:
   *         description: The created hio.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Hio'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   */
  hiosRouter.post(
    "",
    handleRequest(createHio.requestToDto, createHio.handler, 201)
  );

  return hiosRouter;
};
