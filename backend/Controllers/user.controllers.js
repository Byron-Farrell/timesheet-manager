const User = require('../Models/user.model');
const bcrypt = require('bcrypt')


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
    if (request?.body?.username == undefined) {
        response.status(400);
        return response.json({
            success: false,
            message: 'Username field does not exist in request'
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
 (* @description 
 */
function doesUserExist(request, response, next) {
    User.exists({username: request.body.username})
    .then(result => {
        if (result === true) {
            response.status(409);
            return response.json({
                success: false,
                message: 'Username already exists'
            });
        }
        else {
            next();
        }
    })
    .catch(error => {
        // add to logs
        response.status(500);
        return response.json({
            success: false,
            message: error.message
        });
    });
}


/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns {object} json object to client
 * 
 * @description Gets a single user using the username field in the request body.
 */
function getUser(request, response) {
    User.findOne({username: request.body.username})
    .then(result => {
        if (result === null) {
            response.status(404);
            return response.json({
                success: false,
                message: 'User does not exist'
            });
        }
        else {
            response.status(200);
            return response.json({
                success: true,
                message: 'successfully retrieved user',
                data: {
                    user: result
                }
            });
        }        
    })
    .catch(error => {
        // add to logs
        response.status(500);
        return response.json({
            success: false,
            message: error.message
        });
    })
}


/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns {object} json object to client
 * 
 * @description Creates a new user
 */
function postUser(request, response) {
    User.findOne({username: request.body.username})
    .then(result => {
        if (result != null) {
            response.status(409);
            return response.json({
                success: false,
                message: 'Username already exists'
            });
        }
        else {
            bcrypt.hash(request.body.password, 10)
            .then(hash => {
                newUser = new User({
                    username: request.body.username,
                    firstName: request.body.firstName,
                    lastName: request.body.lastName,
                    // email is not a required field. If the request does not have an email then store email as null
                    email: request.body.email == undefined ? null : request.body.email,
                    password: hash, 
                });

                newUser.save()
                .then(user => {
                    console.log(user)
                    response.status(201);
                    return response.json({
                        success: true,
                        message: 'User successfully created'
                    })
                })
                .catch(error => {
                     // TODO: Add to logs
                     response.status(500);
                     return response.json({
                         success: false,
                         message: error.message
                     });
                })
            })
            .catch(error => {
                // TODO: Add to logs             
                response.status(500);
                return response.json({
                    success: false,
                    message: error.message
                });
            })
        }
    })
    .catch(error => {
        // TODO: Add to logs
        console.log(error)
        response.status(500);
        return response.json({
            success: false,
            errorMessage: 'Database failure'
        });
    })
}


/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns {object} json object to client
 * 
 * @description Updates user based on data in request body.
 */
function putUser(request, response) {



    let update = {
        username: request.body.updatedUsername,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.passwordHash
    }

    User.findOneAndUpdate({ username: request.body.username }, update)
    .then(result => {
        console.log(result)
        if (result === null) {
            response.status(404);
            return response.json({
                success: false,
                message: 'User does not exist'
            });
        }
        
        return response.json(result);
    })
    .catch(error => {
        response.status(500);
        return response.json({
            success: false,
            message: error.message
        })
    })
}


/**
 * 
 * @param {object} request 
 * @param {object} response 
 * @returns {object} json object to client
 * 
 * @description Deletes user in mongo database specified by the username in the request body.
 */
function deleteUser(request, response) {
    User.findOneAndDelete({username: request.body.username})
    .then(result => {
        if (result == null) {
            response.status(404);
            return response.json({
                success: false,
                message: 'User does not exist'
            });
        }

        response.status(200);
        return response.json({
            success: true,
            message: 'User successfully deleted'
        });
    })
    .catch(error => {
        response.status(500);
        return response.json({
            success: false,
            message: error.message
        })
    })
}


module.exports = {
    isUsernameInRequestBody,
    doesUserExist,
    getUser,
    postUser,
    putUser,
    deleteUser
}