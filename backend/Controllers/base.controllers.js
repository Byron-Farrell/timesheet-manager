const config = require('../Config/settings');

function homepage(request, response) {
  // TODO: put main.html in settings.js as index html file
  response.sendFile(`${config.STATIC_FILES_PATH}main.html`);
}

module.exports = {
  homepage,
};
