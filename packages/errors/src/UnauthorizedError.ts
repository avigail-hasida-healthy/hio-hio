import { ApiError } from "./ApiError";

/**
 * Represents a 401 which states the request is unauthorized
 */
export class UnauthorizedError extends ApiError {
  constructor(message: string) {
    super(message, "Unauthorized", 401);
  }
}
