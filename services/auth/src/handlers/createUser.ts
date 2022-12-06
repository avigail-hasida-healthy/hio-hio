import { Request } from "express";
import { CreateUserDto } from "../dto/createUserDto";
import { modelToDto } from "../dto/userDto";
import { hashData } from "../lib/crypto";
import { usersRepository } from "../repositories";

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
