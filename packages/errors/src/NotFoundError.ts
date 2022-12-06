import { ApiError } from "./ApiError";

/**
 * Represents a 400 api error which states bad request error
 */
export class NotFoundError extends ApiError {
  constructor(message: string) {
    super(message, "Not Found", 404);
  }
}
