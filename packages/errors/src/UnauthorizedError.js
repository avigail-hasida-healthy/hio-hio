const { ApiError } = require("./ApiError");

/**
 * Represents a 401 which states the request is unauthorized
 */
class UnauthorizedError extends ApiError {
  constructor(message) {
    super(message, "Unauthorized", 401);
  }
}

module.exports = { UnauthorizedError };
