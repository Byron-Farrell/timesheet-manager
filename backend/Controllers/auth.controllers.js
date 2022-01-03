const bcrypt = require('bcrypt');

const config = require('../Config/settings');
const User = require('../Models/user.model');

function login(request, response) {

}

function register(request, response) {
  User.findOne({ username: request.body.username }, (error, user) => {
    if (error) {
      // TODO: Add to logs
      response.status(400);
      return response.json({
        success: false,
        errorMessage: 'Database failure',
      });
    }

    if (user == null) {
      response.status(409);
      return response.json({
        success: false,
        errorMessage: 'Username already exists',
      });
    }

    bcrypt.hash(response.body.password, 10, (error, hash) => {
      if (error) {
        // TODO: Add to logs
        response.status(400);
        return response.json({
          success: false,
          errorMessage: 'Failed to create new user',
        });
      }

      newUser = new User({
        username: response.body.username,
        firstName: response.body.firstName,
        lastName: response.body.lastName,
        email: response.body.email,
        password: hash,
      });

      newUser.save((error) => {
        if (error) {
          // TODO: Add to logs
          response.status(400);
          return response.json({
            success: false,
            errorMessage: 'Failed to create new user',
          });
        }

        response(200);
        response.json({
          success: true,
        });
      });
    });
  });
}

module.exports = {
  login,
  register,
};
