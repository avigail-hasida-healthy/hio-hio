const { AlreadyExistsError } = require('./src/AlreadyExistsError');
const { BadRequestError } = require('./src/BadRequestError');
const { UnauthorizedError } = require('./src/UnauthorizedError');
const { NotFoundError } = require('./src/NotFoundError');

module.exports = {
  AlreadyExistsError,
  BadRequestError,
  UnauthorizedError,
  NotFoundError
}