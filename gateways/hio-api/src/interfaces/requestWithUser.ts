import { Request } from "express";
import { UserDto } from "../dtos/userDto";

/**
 * Represents an express request with a user
 */
export interface RequestWithUser extends Request {
  user: UserDto;
}
