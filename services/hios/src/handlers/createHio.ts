import { Request } from "express";
import { NotFoundError } from "@hio-hio/errors";
import { CreateHioDto, HioDto, modelToDto } from "../dto/hioDto";
import { usersApi } from "../lib/authClient";
import { hiosRepository } from "../repositories";

/**
 * Converts the request to create hio dto
 * @param req The request
 * @returns Returns the create hio dto
 */
export const requestToDto = (req: Request): CreateHioDto => ({
  userId: req.body.userId,
  targetUserId: req.body.targetUserId,
});

/**
 * Handles the create hio request
 * @param dto The create hio dto
 * @returns Returns the hio dto
 */
export const handler = async (dto: CreateHioDto): Promise<HioDto> => {
  try {
    await usersApi.getUser(dto.targetUserId);
  } catch (error) {
    if (error.response.status) {
      throw new NotFoundError("Target user does not exist");
    }

    throw error;
  }

  const hio = await hiosRepository.create(dto);

  return modelToDto(hio);
};
