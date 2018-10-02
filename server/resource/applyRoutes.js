const express = require('express');

module.exports = function applyRoutes(app) {
  const router = express.Router();

  require('./news/NewsResource.js')(router);
  require('./weather/WeatherResource.js')(router);
  require('./widget/WidgetPositionsResource.js')(router);

  app.use('/api', router);
}
