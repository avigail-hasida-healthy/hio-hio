import { JwtPayload } from "../interfaces/jwtPayload";

/**
 * Represents a signed in user
 */
export interface UserDto {
  id: string;
  username: string;
  token?: string;
}

/**
 * Converts a user dto to jwt payload
 * @param dto The user dto
 * @returns the jwt payload
 */
export const userDtoToJwtPayload = (dto: UserDto): JwtPayload => ({
  sub: dto.id,
  username: dto.username,
});
