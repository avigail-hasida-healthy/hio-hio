import { CreationDto } from "@gw-workshop/interfaces";

/**
 * Represents an existing hio dto
 */
export interface HioDto {
  id: string;
  userId: string;
  targetUserId: string;
  createdAt?: Date;
}

/**
 * Represents the send a hio parameters
 */
export interface SendHioDto extends CreationDto<HioDto> {}
