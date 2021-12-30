
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
    if (request?.headers?.['content-type'] == undefined) {
        response.status(400);
        return response.json({
            success: false,
            message: 'content-type not found in request header'
        });
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
        return response.json({
            success: false,
            message: 'Endpoint only accepts application/json content-type'
        });
    }

    next();
}

function homepage() {
    // TODO: put main.html in settings.js as index html file
    response.sendFile(STATIC_FILES_PATH + 'main.html');
}

module.exports = {
    checkHeaders,
    jsonConentTypeCheck,
    homepage
}