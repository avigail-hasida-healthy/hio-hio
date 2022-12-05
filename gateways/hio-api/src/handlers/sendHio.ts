import { Hio } from "@hio-hio/hios-client";
import { SendHioDto, HioDto } from "../dtos/hioDto";
import { RequestWithUser } from "../interfaces/requestWithUser";
import { hiosApi } from "../lib/hiosClient";

const hioToHioDto = (hio: Hio) => ({
  id: hio.id || "",
  userId: hio.userId || "",
  targetUserId: hio.targetUserId || "",
  createdAt: hio.createdAt && new Date(hio.createdAt),
});

/**
 * Converts the specified request to CreateHioDto
 * @param req The request
 * @returns the create hio dto
 */
export const requestToDto = (req: RequestWithUser): SendHioDto => ({
  userId: req.user.id,
  targetUserId: req.body.targetUserId,
});

/**
 * Handles a send hio operation
 * @param dto the send hio dto
 * @returns the created hio dto
 */
export const handler = async (dto: SendHioDto): Promise<HioDto> => {
  const response = await hiosApi.createHio({
    userId: dto.userId,
    targetUserId: dto.targetUserId,
  });

  return hioToHioDto(response.data);
};
