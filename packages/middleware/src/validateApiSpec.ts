const OpenApiValidator = require('express-openapi-validator');

/**
 * Validates the request and responce agains the specified api specification
 * @param {*} opts
 * @param {Object} apiSpec The api spec
 * @returns Returns the middleware
 */
module.exports = ({ apiSpec }) => OpenApiValidator.middleware({
  apiSpec,
  validateSecurity: false,
  validateResponses: true
});