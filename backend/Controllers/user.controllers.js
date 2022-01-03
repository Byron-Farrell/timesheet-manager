const bcrypt = require('bcrypt');

const User = require('../Models/user.model');

const saltRounds = 10;

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
  User.exists({ username: request.body.username })
    .then((result) => {
      if (result === true) {
        response.status(409);
        response.json({
          success: false,
          message: 'Username already exists',
        });
        return;
      }
      next();
    })
    .catch((error) => {
      // add to logs
      response.status(500);
      response.json({
        success: false,
        message: error.message,
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
  User.findOne({ username: request.body.username })
    .then((result) => {
      if (result === null) {
        response.status(404);
        response.json({
          success: false,
          message: 'User does not exist',
        });
        return;
      }
      response.status(200);
      response.json({
        success: true,
        message: 'successfully retrieved user',
        data: {
          user: result,
        },
      });
    })
    .catch((error) => {
      // add to logs
      response.status(500);
      response.json({
        success: false,
        message: error.message,
      });
    });
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
  User.findOne({ username: request.body.username })
    .then((result) => {
      if (result != null) {
        response.status(409);
        response.json({
          success: false,
          message: 'Username already exists',
        });
        return;
      }
      bcrypt.hash(request.body.password, saltRounds)
        .then((hash) => {
          const newUser = new User({
            username: request.body.username,
            firstName: request.body.firstName,
            lastName: request.body.lastName,
            // email is not a required field.
            // If the request does not have an email then store email as null
            email: request.body.email === undefined ? null : request.body.email,
            password: hash,
          });

          newUser.save()
            .then((user) => {
              response.status(201);
              response.json({
                success: true,
                message: `User ${user.username} successfully created`,
              });
            })
            .catch((error) => {
              // TODO: Add to logs
              response.status(500);
              response.json({
                success: false,
                message: error.message,
              });
            });
        })
        .catch((error) => {
          // TODO: Add to logs
          response.status(500);
          response.json({
            success: false,
            message: error.message,
          });
        });
    })
    .catch((error) => {
      // TODO: Add to logs
      response.status(500);
      response.json({
        success: false,
        errorMessage: error.message,
      });
    });
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
  (async () => {
    const update = {
      username: request.body.updatedUsername,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: undefined,
    };

    if (request.body.password !== undefined && update.password !== null) {
      try {
        const user = await User.findOne({ username: request.body.username });
        const match = await bcrypt.compare(request.body.password, user.password);
        if (!match) {
          const passwordHash = await bcrypt.hash(request.body.password, saltRounds);
          update.password = passwordHash;
        }
      } catch (error) {
        response.status(500);
        response.json({
          success: false,
          message: error.message,
        });
        return;
      }
    }

    User.findOneAndUpdate({ username: request.body.username }, update)
      .then((result) => {
        if (result === null) {
          response.status(404);
          response.json({
            success: false,
            message: 'User does not exist',
          });
          return;
        }

        response.json(result);
      })
      .catch((error) => {
        response.status(500);
        response.json({
          success: false,
          message: error.message,
        });
      });
  })();
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
  User.findOneAndDelete({ username: request.body.username })
    .then((result) => {
      if (result == null) {
        response.status(404);
        response.json({
          success: false,
          message: 'User does not exist',
        });
        return;
      }

      response.status(200);
      response.json({
        success: true,
        message: 'User successfully deleted',
      });
    })
    .catch((error) => {
      response.status(500);
      response.json({
        success: false,
        message: error.message,
      });
    });
}

module.exports = {
  doesUserExist,
  getUser,
  postUser,
  putUser,
  deleteUser,
};
