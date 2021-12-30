const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const databaseSetup = require('./database');
const config = require('./Config/settings');
const routes = require('./Routes/index.routes');

const app = express();
const port = 3000; // TODO put in env file or default to 3000

databaseSetup();

app.use(express.static(config.STATIC_FILES_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});

