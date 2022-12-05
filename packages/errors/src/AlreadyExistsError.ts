import { ApiError } from "./ApiError";

/**
 * Represents a 409 api error which states entity already exists or conflict
 */
export class AlreadyExistsError extends ApiError {
  constructor(message: string) {
    super(message, "Entity Already Exists", 409);
  }
}
