import { UserModel } from "../lib/models/user";

/**
 * Represents the data of existing user
 */
export interface UserDto {
  id: string;
  name: string;
}

/**
 * Converts the UserModel to UserDto
 */
export const modelToDto = (model: UserModel): UserDto => ({
  id: model.id,
  name: model.name,
});

/**
 * Represents the data received when requesting a user
 */
export interface GetUserDto {
  id: string;
}
