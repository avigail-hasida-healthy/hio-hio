import { AlreadyExistsError } from "@hio-hio/errors";
import { UniqueConstraintError } from "sequelize";
import { User, UserModel } from "../lib/models/user";

/**
 * Create a new user
 * @param name The user name
 * @param hashedPassword The user hashed password
 * @returns Returns the created user
 */
export const create = async (createModel: Omit<UserModel, "id">) => {
  try {
    const user = await User.create(createModel);

    return user.get({ plain: true }) as UserModel;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new AlreadyExistsError("User name already exists");
    }
  }
};
