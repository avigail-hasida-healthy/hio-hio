/**
 * Executes the specified handler with the dto and returns the result in the response
 * @param {(req) => dto} requestToDtoFn 
 * @param {(dto) => any} handler 
 * @param {number} statusCode 
 * @returns Middleware to execute a handler and return the result in the response
 */
module.exports = (requestToDtoFn, handler, statusCode = 200) => async (req, res, next) => {
  try {
    const dto = requestToDtoFn(req);
    const result = await handler(dto);

    if (result !== undefined) {
      res.status(statusCode).json(result);
    } else {
      res.sendStatus(statusCode);
    }

  } catch (error) {
    next(error)
  }
}