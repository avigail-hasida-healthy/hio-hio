import { NotFoundError } from "@hio-hio/errors";
import { Request } from "express";
import { GetUserDto, modelToDto, UserDto } from "../dto/userDto";
import { usersRepository } from "../repositories";

/**
 * Converts the request to create user dto
 * @param req The request
 * @returns Returns the get user dto
 */
export const requestToDto = (req: Request): GetUserDto => ({
  id: req.params.id,
});

/**
 * Handles the get user request
 * @param dto The data to retreive the user
 * @returns the user data
 */
export const handler = async (dto: GetUserDto): Promise<UserDto> => {
  const user = await usersRepository.getById(dto.id);

  if (!user) {
    throw new NotFoundError("User was not found");
  }

  return modelToDto(user);
};
