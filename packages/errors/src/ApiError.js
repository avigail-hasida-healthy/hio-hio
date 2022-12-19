/**
 * Represents an api error which contains a status code
 */
class ApiError extends Error {
  constructor(
    message,
    displayMessage,
    statusCode
  ) {
    super(message ?? displayMessage);
    this.displayMessage = displayMessage;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, ApiError);
  }
}


module.exports = { ApiError };