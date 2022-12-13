import { Hio } from "@hio-hio/hios-client";
import { GetHiosDto, HioDto } from "../dtos/hioDto";
import { RequestWithUser } from "../interfaces/requestWithUser";
import { hiosApi } from "../lib/hiosClient";

const hioToHioDto = (hio: Hio): HioDto => ({
  id: hio.id || "",
  userId: hio.userId || "",
  targetUserId: hio.targetUserId || "",
  createdAt: hio.createdAt && new Date(hio.createdAt),
});

export const requestToDto = (req: RequestWithUser): GetHiosDto => ({
  targetUserId: req.user.id,
});

export const handler = async (dto: GetHiosDto) => {
  const response = await hiosApi.getHiosByTargetUserId(dto.targetUserId);

  const arr = response.data;

  return arr.map(hioToHioDto);
};
