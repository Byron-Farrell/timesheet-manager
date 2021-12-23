const path = require('path');


const STATIC_FILES_PATH = path.join(__dirname + '/../public/');
const DATABASE_URL = 'mongodb://127.0.0.1:27017/timesheet_manager';

module.exports = {
    STATIC_FILES_PATH,
    DATABASE_URL
}

