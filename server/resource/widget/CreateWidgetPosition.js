const isValidUpdateCreateRequest = require('./utils.js').isValidUpdateCreateRequest;
const utils = require('../utils.js');
const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

const http = require('http');

module.exports = function createWidgetPosition(req, res) {
  if (!isValidUpdateCreateRequest(req.body)) {
    const status = 400;
    utils.mkJsonError(res, status)(http.STATUS_CODES[status]);
    return;
  }

  widgetPositionService.createWidgetPosition(req.body)
    .then((data) => {
      utils.endWithStatus(201, res);
    })
    .catch(utils.mkJsonError(res));
}
