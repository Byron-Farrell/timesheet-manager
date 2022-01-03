/**
 *
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @returns
 *
 * @description
 */
function isUsernameInRequestBody(request, response, next) {
  if (request?.body?.username === undefined) {
    response.status(400);
    response.json({
      success: false,
      message: 'Username field does not exist in request',
    });
    return;
  }

  next();
}

module.exports = {
  isUsernameInRequestBody,
};
