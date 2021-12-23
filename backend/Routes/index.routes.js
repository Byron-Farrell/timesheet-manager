const express = require('express');
const path = require('path');

const config = require('../Config/settings');
const userRoutes = require('./user.routes.js');
const authRoutes = require('./auth.routes.js')


const router = express.Router();
router.use('/', userRoutes);
router.use('/',authRoutes);

router.get('/', (request, response) => {
    response.sendFile(config.STATIC_FILES_PATH + 'main.html');

    // TODO
    // add error checking
});


module.exports = router;
