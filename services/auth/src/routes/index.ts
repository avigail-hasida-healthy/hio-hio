import { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { validateApiSpec } from "@hio-hio/middleware";
import apiSpec from "../../openapi.json";
import { setupRouter as setupUsersRouter } from "./users";

export const setupRoutes = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

  app.use(validateApiSpec({ apiSpec }));

  app.use("/users", setupUsersRouter());
};
