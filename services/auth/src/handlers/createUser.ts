import { Request } from "express";
import { CreateUserDto } from "../dto/createUserDto";
import { UserDto } from "../dto/userDto";
import { hashData } from "../lib/crypto";
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
export const requestToDto = (req: Request): CreateUserDto => {
  return {
    name: req.body.name,
    password: req.body.password,
  };
};

/**
 * Handles the create user request
 * @param dto The create user dto
 * @returns Returns the user dto
 */
export const handler = async (dto: CreateUserDto) => {
  const hashedPassword = hashData(dto.password);

  const user = await usersRepository.create({ name: dto.name, hashedPassword });

  return modelToDto(user);
};
