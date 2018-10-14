const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

const GetWidgetPositions = require('./GetWidgetPositions.js');
const UpdateWidgetPositions = require('./UpdateWidgetPositions.js');

const ENDPOINT = '/widgets';

module.exports = function WidgetPositionResource(router) {
  router.get(ENDPOINT, GetWidgetPositions);

  router.put(ENDPOINT, UpdateWidgetPositions);
}
