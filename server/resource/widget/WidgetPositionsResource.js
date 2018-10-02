const widgetPositionService = require('../../service/widget/WidgetPositionsService.js');

const GetWidgetPositions = require('./GetWidgetPositions.js');
const UpdateWidgetPosition = require('./UpdateWidgetPosition.js');
const DeleteWidgetPosition = require('./DeleteWidgetPosition.js');
const CreateWidgetPosition = require('./CreateWidgetPosition.js');

const ENDPOINT = '/widgets';

module.exports = function WidgetPositionResource(router) {
  router.get(ENDPOINT, GetWidgetPositions);

  router.put(ENDPOINT, UpdateWidgetPosition);

  router.post(ENDPOINT, CreateWidgetPosition);

  router.delete(`${ENDPOINT}/:widgetName`, DeleteWidgetPosition);
}
