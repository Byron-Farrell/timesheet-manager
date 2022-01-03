/**
 *
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @returns
 *
 * @description
 */
function checkHeaders(request, response, next) {
  if (request?.headers?.['content-type'] === undefined) {
    response.status(400);
    response.json({
      success: false,
      message: 'content-type not found in request header',
    });
    return;
  }

  next();
}

/**
 *
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @returns
 *
 * @description
 */
function jsonConentTypeCheck(request, response, next) {
  if (request?.headers?.['content-type'] !== 'application/json') {
    response.status(415);
    response.json({
      success: false,
      message: 'Endpoint only accepts application/json content-type',
    });
    return;
  }

  next();
}
module.exports = {
  checkHeaders,
  jsonConentTypeCheck,
};
