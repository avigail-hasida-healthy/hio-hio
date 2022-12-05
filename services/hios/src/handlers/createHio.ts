import { Request } from "express";
import { CreateHioDto, HioDto, modelToDto } from "../dto/hioDto";
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
  const hio = await hiosRepository.create(dto);

  return modelToDto(hio);
};
