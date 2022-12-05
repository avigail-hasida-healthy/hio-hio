import { AuthDto } from "../dtos/authDto";
import { UserDto, userDtoToJwtPayload } from "../dtos/userDto";
import { usersApi } from "../lib/authClient";
import { signJwt } from "../lib/jwt";

/**
 * Creates a new user credentials and returns the user dto
 * @param dto The auth dto which contains the username and password
 * @returns The signed user dto
 */
export const signup = async (dto: AuthDto): Promise<UserDto> => {
  const response = await usersApi.createUser({
    name: dto.username,
    password: dto.password,
  });

  const user = { id: response.data.id, username: response.data.name };
  const token = signJwt(userDtoToJwtPayload(user));

  return { ...user, token };
};
