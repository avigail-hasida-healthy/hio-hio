import { GetUserDto, UserDto, modelToDto } from "../dto/userDto";
import { usersRepository } from "../repositories";
import { NotFoundError } from "@hio-hio/errors";
import { Request } from "express";
/**
 * Converts the request to create user dto
 * @param req The request
 * @returns Returns the get user dto
 */
export const requestToDto = (req: Request): GetUserDto => ({
  id: req.params.id,
});

export const handler = async (dto: GetUserDto): Promise<UserDto> => {
  const user = await usersRepository.getById(dto.id);

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return modelToDto(user);
};
