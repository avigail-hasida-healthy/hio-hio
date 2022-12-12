const { ApiError } = require("./ApiError");

/**
 * Represents a 409 api error which states entity already exists or conflict
 */
class AlreadyExistsError extends ApiError {
  constructor(message) {
    super(message, "Entity Already Exists", 409);
  }
}

module.exports = { AlreadyExistsError };
