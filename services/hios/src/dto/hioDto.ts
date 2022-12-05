import { CreationDto } from "@hio-hio/interfaces";
import { HioModel } from "../lib/models/hio";

/**
 * Represents an existing hio
 */
export interface HioDto {
  id: string;
  userId: string;
  targetUserId: string;
  createdAt: Date;
}

/**
 * Represents the data needed to create a hio
 */
export interface CreateHioDto extends CreationDto<HioDto> {}

/**
 * Extracts hio dto from hio model
 */
export const modelToDto = (model: HioModel): HioDto => ({
  id: model.id,
  userId: model.userId,
  targetUserId: model.targetUserId,
  createdAt: model.createdAt,
});
