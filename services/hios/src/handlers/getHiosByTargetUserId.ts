import { Request } from "express";
import { QueryString } from "@hio-hio/helpers";
import { GetHiosByTargetUserId, HioDto, modelToDto } from "../dto/hioDto";
import { hiosRepository } from "../repositories";

export const requestToDto = (req: Request): GetHiosByTargetUserId => ({
  targetUserId: QueryString.parameterToString(req.query.targetUserId),
});

export const handler = async (
  dto: GetHiosByTargetUserId
): Promise<HioDto[]> => {
  const hios = await hiosRepository.getByTargetUserId(dto.targetUserId);

  return hios.map(modelToDto);
};
