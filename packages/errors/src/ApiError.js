/**
 * Represents an api error which contains a status code
 */
class ApiError extends Error {
  constructor(
    message,
    displayMessage,
    statusCode
  ) {
    this.displayMessage = displayMessage;
    this.statusCode = statusCode;
    super(message ?? displayMessage);
    Error.captureStackTrace(this, ApiError);
  }
}


module.exports = { ApiError };