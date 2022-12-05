import type { Application } from "express";

const setupServer = async (
  setupApiFn: () => Application,
  setupDbFn?: () => Promise<void>
) => {
  try {
    if (setupDbFn) {
      await setupDbFn();
    }

    return setupApiFn();
  } catch (error) {
    console.log("Failed to sutup server");
    console.log(error);
  }
};

/**
 * Setup an api server with the specified parameters
 * @param serviceName The service name
 * @param port The port which the app should listen to
 * @param setupApiFn The setupApi function which setups the express application
 * @param setupDbFn The setupDb function which setups the db
 */
export const setupApiServer = (
  serviceName: string,
  port: number,
  setupApiFn: () => Application,
  setupDbFn?: () => Promise<void>
) => {
  setupServer(setupApiFn, setupDbFn).then((app) => {
    app.listen(port, () => {
      console.log(`${serviceName} is now listening on port ${port}`);
    });
  });
};
