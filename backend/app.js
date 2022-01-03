const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const databaseSetup = require('./database');
const config = require('./Config/settings');
const routes = require('./Routes/index.routes');

const app = express();

databaseSetup();

app.use(express.static(config.STATIC_FILES_PATH));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);


app.listen(config.PORT, () => {
    console.log(`Listening on http://localhost:${config.PORT}`);
});

