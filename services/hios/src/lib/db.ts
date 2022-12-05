import { Sequelize } from "sequelize";
import { init as initHio } from "./models/hio";

const uri = "postgres://gw-dev:@localhost:5437/gw-dev";

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
