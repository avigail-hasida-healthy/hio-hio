import { Application } from "express";
import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import swaggerUi from "swagger-ui-express";
import { validateApiSpec } from "@hio-hio/middleware";
import apiSpec from "../../openapi.json";
import { setupRouter as setupHiosRouter } from "./hios";
import { setupRouter as setupAuthRouter } from "./auth";
import { JWT_SECRET } from "../lib/jwt";

const setupPassport = () => {
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: JWT_SECRET,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, { id: token.sub, username: token.username });
        } catch (error) {
          done(error);
        }
      }
    )
  );
};

/**
 * Setup the api routes
 * @param app The express application
 */
export const setupRoutes = (app: Application) => {
  setupPassport();

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(apiSpec));

  app.use(validateApiSpec({ apiSpec }));

  app.use("/auth", setupAuthRouter());

  app.use(passport.authenticate("jwt", { session: false }));

  app.use("/hios", setupHiosRouter());
};

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    hio_auth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */
