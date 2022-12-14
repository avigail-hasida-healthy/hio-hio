import { Application } from "express";
import { validateApiSpec } from "@hio-hio/middleware";
import apiSpec from "../../openapi.json";
import { setupRouter as setupUsersRouter } from "./users";

export const setupRoutes = (app: Application) => {
  app.use(validateApiSpec({ apiSpec }));

  app.use("/users", setupUsersRouter());
};
