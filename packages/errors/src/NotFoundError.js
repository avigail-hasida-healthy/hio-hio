const { ApiError } = require("./ApiError");

/**
 * Represents a 400 api error which states bad request error
 */
class NotFoundError extends ApiError {
  constructor(message) {
    super(message, "Not Found", 404);
  }
}

module.exports = { NotFoundError };