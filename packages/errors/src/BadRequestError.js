const { ApiError } = require("./ApiError");

/**
 * Represents a 400 api error which states bad request error
 */
class BadRequestError extends ApiError {
  constructor(message) {
    super(message, "Bad Reqeust", 400);
  }
}

module.exports = { BadRequestError };
