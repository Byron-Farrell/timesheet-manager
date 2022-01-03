const express = require('express');

const userController = require('../Controllers/user.controllers');
const baseMiddleware = require('../Middleware/base.middleware');
const userMiddleware = require('../Middleware/user.middleware');

const router = express.Router();

router.get('/user', [
  baseMiddleware.checkHeaders,
  baseMiddleware.jsonConentTypeCheck,
  userMiddleware.isUsernameInRequestBody,
  userController.getUser,
]);

router.post('/user', [
  baseMiddleware.checkHeaders,
  baseMiddleware.jsonConentTypeCheck,
  userMiddleware.isUsernameInRequestBody,
  userController.postUser,
]);

router.put('/user', [
  baseMiddleware.checkHeaders,
  baseMiddleware.jsonConentTypeCheck,
  userMiddleware.isUsernameInRequestBody,
  userController.putUser,
]);

router.delete('/user', [
  baseMiddleware.checkHeaders,
  baseMiddleware.jsonConentTypeCheck,
  userMiddleware.isUsernameInRequestBody,
  userController.deleteUser,
]);

module.exports = router;
