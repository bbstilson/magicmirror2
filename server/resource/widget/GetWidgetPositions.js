const utils = require('../utils.js');
const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

module.exports = function getAllWidgetPositions(req, res) {
  widgetPositionService.getAllWidgetPositions()
    .then((data) => {
      res
        .status(200)
        .json(data.map(_ => _.dataValues));
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error });
    });
}
