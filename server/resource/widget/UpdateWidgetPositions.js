const isValidUpdateCreateRequest = require('./utils.js').isValidUpdateCreateRequest;
const utils = require('../utils.js');
const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

const http = require('http');

module.exports = function updateWidgetPositions(req, res) {
  if (
    !Array.isArray(req.body) ||
    !req.body.every(w => isValidUpdateCreateRequest(w))
  ) {
    utils.endWithStatus(400, res);
    return;
  }

  widgetPositionService.updateWidgetPositions(req.body)
    .then((data) => {
      utils.endWithStatus(200, res);
    })
    .catch((error) => {
      utils.endWithStatus(error === 0 ? 400 : 500, res);
    });
}
