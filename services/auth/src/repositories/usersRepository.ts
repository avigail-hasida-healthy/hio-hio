import { AlreadyExistsError } from "@hio-hio/errors";
import { CreationModel } from "@hio-hio/interfaces";
import { UniqueConstraintError } from "sequelize";
import { User, UserModel } from "../lib/models/user";

/**
 * Get a user by its name
 * @param name The user name
 * @returns The user
 */
export const getByName = async (name: string): Promise<UserModel> => {
  const user = await User.findOne({ where: { name }, raw: true });

  return user;
};

/**
 * Create a new user
 * @param name The user name
 * @param hashedPassword The user hashed password
 * @returns Returns the created user
 */
export const create = async (
  createModel: CreationModel<UserModel>
): Promise<UserModel> => {
  try {
    const user = await User.create(createModel);

    return user.get({ plain: true });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new AlreadyExistsError("User name already exists");
    }
  }
};

export const getById = async (id: string): Promise<UserModel> => {
  const user = await User.findOne({ where: { id } });

  return user;
};
