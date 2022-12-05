import { Sequelize } from "sequelize";
import { init as initHio } from "./models/hio";

const uri = "postgres://hio-hio-dev:@localhost:5438/hio-hio-dev";

let sequelize: Sequelize;

const initModels = () => {
  initHio(sequelize);
};

/**
 * Setup the db connection and models
 */
export const setupDb = async () => {
  if (sequelize) {
    return;
  }

  sequelize = new Sequelize(uri);

  initModels();

  await sequelize.sync({ alter: true });
};
