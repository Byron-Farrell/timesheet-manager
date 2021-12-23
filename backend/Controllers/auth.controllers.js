const bcrypt = require('bcrypt');

const config = require('../Config/settings');
const User = require('../Models/user.model');

function login(request, response) {
    return;
}

function register(request, response) {
    User.findOne({username: request.body.username}, (error, user) => {
        if (error) {
            // TODO: Add to logs
            response.status(400);
            response.json({
                success: false,
                errorMessage: 'Database failure'
            });
            return;

        }

        if (user == null) {
            response.status(409);
            response.json({
                success: false,
                errorMessage: 'Username already exists'
            });
            return;
        }
        else {
            bcrypt.hash(response.body.password, 10, function(error, hash) {
                if (error) {
                    // TODO: Add to logs
                    response.status(400);
                    response.json({
                        success: false,
                        errorMessage: 'Failed to create new user'
                    });
                    return;
                }
        
                newUser = new User({
                    username: response.body.username,
                    firstName: response.body.firstName,
                    lastName: response.body.lastName,
                    email: response.body.email,
                    password: hash, 
                });

                newUser.save(error => {
                    if (error) {
                        // TODO: Add to logs
                        response.status(400);
                        response.json({
                            success: false,
                            errorMessage: 'Failed to create new user'
                        });
                        return;
                    }

                    response(200);
                    response.json({
                        success: true
                    })
                });
        
            });
        }
    })
    
}

module.exports = {
    login,
    register
}