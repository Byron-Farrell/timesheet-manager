const express = require('express');

const userController = require('../Controllers/user.controllers.js');
const baseController = require('../Controllers/base.controllers.js');

const router = express.Router();

router.get('/user', [
    baseController.checkHeaders, 
    baseController.jsonConentTypeCheck,
    userController.isUsernameInRequestBody,
    userController.getUser
]);

router.post('/user', [
    baseController.checkHeaders, 
    baseController.jsonConentTypeCheck,
    userController.isUsernameInRequestBody,
    userController.postUser
]);

router.put('/user', [
    baseController.checkHeaders, 
    baseController.jsonConentTypeCheck,
    userController.isUsernameInRequestBody,
    userController.doesUserExist,
    userController.putUser
]);

router.delete('/user', [
    baseController.checkHeaders, 
    baseController.jsonConentTypeCheck,
    userController.isUsernameInRequestBody,
    userController.deleteUser
]);

module.exports = router;