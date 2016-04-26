'use strict';

module.exports = function(APP_PORT) {
  const express = require('express');
  const app     = express();
  app.use('/', express.static(__dirname + '/build'));
  app.listen(APP_PORT, () => {
    console.log('----API LISTENING ON ' + APP_PORT + '----');
  });
};
