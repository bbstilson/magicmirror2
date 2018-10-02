const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');
const utils = require('../utils.js');

const http = require('http');

module.exports = function deleteWidgetPosition(req, res) {
  if (!req.params.widgetName) {
    utils.endWithStatus(400, res);
    return;
  }

  widgetPositionService.deleteWidgetPosition(req.params.widgetName)
    .then((data) => {
      utils.endWithStatus(200, res);
    })
    .catch((error) => {
      utils.endWithStatus(error === 0 ? 400 : 500, res);
    });
}
