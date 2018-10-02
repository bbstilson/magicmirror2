const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

const utils = require('../utils.js');
const checkStatus = utils.checkStatus;

module.exports = function WidgetPositionResource(router) {
  router.get('/widgets', (req, res) => {
    widgetPositionService.getAllWidgetPositions()
      .then((data) => {
        console.log(data);
        res.json({ hey: 'hi' });
      })
      .catch((error) => {
        res.json({
          error: error
        });
      })
  });
}
