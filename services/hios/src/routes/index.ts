import { Application } from "express";
import { validateApiSpec } from "@hio-hio/middleware";
import apiSpec from "../../openapi.json";
import { setupRouter as setupHiosRouter } from "./hios";

/**
 * Setups all the api routes
 * @param app The express application
 */
export const setupRoutes = (app: Application) => {
  app.use(validateApiSpec({ apiSpec }));

  app.use("/hios", setupHiosRouter());
};
