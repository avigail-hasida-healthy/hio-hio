/**
 * Represents an api error which contains a status code
 */
export abstract class ApiError extends Error {
  constructor(
    message: string,
    public displayMessage: string,
    public statusCode: number
  ) {
    super(message ?? displayMessage);
    Error.captureStackTrace(this, ApiError);
  }
}
