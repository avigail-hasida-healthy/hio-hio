import { Application } from "express";
import { setupRouter as setupUsersRouter } from "./users";

export const setupRoutes = (app: Application) => {
  app.use("/users", setupUsersRouter());
};
