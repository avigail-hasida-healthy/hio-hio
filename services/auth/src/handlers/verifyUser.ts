import { Request } from "express";
import { UnauthorizedError } from "@gw-workshop/errors";
import { VerifyUserDto } from "../dto/verifyUserDto";
import { UserDto } from "../dto/userDto";
import { compareHash } from "../lib/crypto";
import type { UserModel } from "../lib/models/user";
import { usersRepository } from "../repositories";

const modelToDto = (model: UserModel): UserDto => ({
  id: model.id,
  name: model.name,
});

/**
 * Converts the request to create user dto
 * @param req The request
 * @returns Returns the create user dto
 */
export const requestToDto = (req: Request): VerifyUserDto => {
  return {
    name: req.body.name,
    password: req.body.password,
  };
};

/**
 * Handles the verify user request
 * @param dto The verify user dto
 * @returns Returns the user dto
 */
export const handler = async (dto: VerifyUserDto) => {
  const user = await usersRepository.getByName(dto.name);

  if (!user) {
    throw new UnauthorizedError("No user found");
  }

  if (!compareHash(dto.password, user.hashedPassword)) {
    throw new UnauthorizedError("Password does not match");
  }

  return modelToDto(user);
};
