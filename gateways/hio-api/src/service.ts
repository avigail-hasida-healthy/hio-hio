import express, { Application } from "express";
import { setupRoutes } from "./routes";

let app: Application;

/**
 * Setups the api application
 * @returns Returns the express application
 */
export const setupApi = () => {
  if (app) {
    return app;
  }

  app = express();

  app.use(express.json({ limit: "5mb" }));

  setupRoutes(app);

  return app;
};
