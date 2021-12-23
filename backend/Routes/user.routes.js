const express = require('express');

const userController = require('../Controllers/user.controllers.js');

const router = express.Router();

router.get('/user', userController.getUser);

router.post('/user', userController.postUser);

router.put('/user', userController.putUser);

router.delete('/user', userController.deleteUser);

module.exports = router;