const isValidUpdateCreateRequest = require('./utils.js').isValidUpdateCreateRequest;
const utils = require('../utils.js');
const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

const http = require('http');

module.exports = function updateWidgetPosition(req, res) {
  if (!isValidUpdateCreateRequest(req)) {
    utils.endWithStatus(400, res);
    return;
  }

  widgetPositionService.updateWidgetPosition(req.body)
    .then((data) => {
      utils.endWithStatus(200, res);
    })
    .catch((error) => {
      utils.endWithStatus(error === 0 ? 400 : 500, res);
    });
}
