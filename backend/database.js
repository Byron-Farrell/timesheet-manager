const mongoose = require('mongoose');
const config = require('./Config/settings.js');

async function setup() {
    await mongoose.connect(config.DATABASE_URL)
    .catch(error => {
        console.error(error);
        // TODO: Store error in logs
    })

    mongoose.connection.on('error', error => {
        console.log(error);
        // TODO: Store error in logs
    });
}

module.exports = setup;