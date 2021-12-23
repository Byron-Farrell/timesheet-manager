const express = require('express');
const config = require('../Config/settings');


const router = express.Router();

// login
router.get('/login', (request, response) => {
    response.sendFile(config.STATIC_FILES_PATH + 'login.html');
});

router.get('/register', (request, response) => {
    response.sendFile(config.STATIC_FILES_PATH + 'registration.html');
});

router.post('/login', (request, response) => {
    return;
});

// recover

module.exports = router;