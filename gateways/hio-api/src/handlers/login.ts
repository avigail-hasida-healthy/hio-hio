import { AuthDto } from "../dtos/authDto";
import { UserDto, userDtoToJwtPayload } from "../dtos/userDto";
import { usersApi } from "../lib/authClient";
import { signJwt } from "../lib/jwt";

/**
 * Checks the user credentials and returns the user dto if valid
 * @param dto The auth dto which contains the username and password
 * @returns The signed user dto
 */
export const login = async (dto: AuthDto): Promise<UserDto> => {
  const response = await usersApi.verifyUser({
    name: dto.username,
    password: dto.password,
  });

  const user = { id: response.data.id, username: response.data.name };
  const token = signJwt(userDtoToJwtPayload(user));

  return { ...user, token };
};
