import express, { Router } from "express";
import { handleRequest } from "@hio-hio/middleware";
import * as sendHio from "../handlers/sendHio";
import * as getMyHios from "../handlers/getMyHios";

let hiosRouter: Router;

/**
 * Setup the hios router
 * @returns the hios router
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
   *     summary: Send hio
   *     description: Send hio
   *     operationId: sendHio
   *     security:
   *       - hio_auth: []
   *     tags:
   *       - Hios
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - targetUserId
   *             properties:
   *               targetUserId:
   *                 type: string
   *                 format: uuid
   *                 description: The user's id which will receive the hio
   *                 example: 0a81be47-451f-49f3-8f07-29461cbda3f5
   *     responses:
   *       201:
   *         description: The sent hio.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Hio'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  hiosRouter.post(
    "",
    handleRequest(sendHio.requestToDto, sendHio.handler, 201)
  );

  /**
   * @openapi
   * /hios:
   *   get:
   *     summary: Get my Hios
   *     description: Get the Hios sent to the current user
   *     operationId: getMyHios
   *     security:
   *       - hio_auth: []
   *     tags:
   *       - Hios
   *     responses:
   *       200:
   *         description: The hios which were sent to me.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Hio'
   *       400:
   *         $ref: '#/components/responses/BadRequest'
   *       401:
   *         $ref: '#/components/responses/Unauthorized'
   */
  hiosRouter.get(
    "",
    handleRequest(getMyHios.requestToDto, getMyHios.handler, 200)
  );

  return hiosRouter;
};
