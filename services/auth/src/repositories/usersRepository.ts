import { AlreadyExistsError } from "@gw-workshop/errors";
import { UniqueConstraintError } from "sequelize";
import { User, UserModel } from "../lib/models/user";

/**
 * Get a user by its name
 * @param name The user name
 * @returns The user
 */
export const getByName = async (name: string) => {
  const user = await User.findOne({ where: { name }, raw: true });

  return user as UserModel;
};

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
