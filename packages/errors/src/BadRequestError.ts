import { ApiError } from "./ApiError";

/**
 * Represents a 400 api error which states bad request error
 */
export class BadRequestError extends ApiError {
  constructor(message: string) {
    super(message, "Bad Reqeust", 400);
  }
}
