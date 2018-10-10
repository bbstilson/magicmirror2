const utils = require('../utils.js');
const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

const http = require('http');

function isValidUpdateReq(req) {
  console.log('validating req:', req);
  return true;
}

module.exports = function updateWidgetPositions(req, res) {
  if (!Array.isArray(req.body) || !req.body.every(isValidUpdateReq)) {
    res
      .status(400)
      .end(http.STATUS_CODES[400]);
    return;
  }

  widgetPositionService.updateWidgetPositions(req.body)
    .then(() => widgetPositionService.getAllWidgetPositions())
    .then((data) => {
      res
        .status(200)
        .json(data.map(_ => _.dataValues));
    })
    .catch(({ errorCode, errorText }) => {
      const status = errorCode === 0 ? 400 : 500;
      res
        .status(status)
        .end(`${http.STATUS_CODES[status]} - ${errorText}`);
    });
}
