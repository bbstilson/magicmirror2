const utils = require('../utils.js');
const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

module.exports = function getAllWidgetPositions(req, res) {
  widgetPositionService.getAllWidgetPositions()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(utils.mkJsonError(res));
}
