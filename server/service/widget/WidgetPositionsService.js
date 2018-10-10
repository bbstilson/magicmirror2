const widgetPositionsDao = require('../../dao/widget/WidgetPositionsDao.js');

function getAllWidgetPositions() {
  return widgetPositionsDao.getAllWidgetPositions();
}

function updateWidgetPositions(widgets) {
  return Promise.all(widgets.map(widgetPositionsDao.updateOrCreateWidgetPosition));
}

function createWidgetPosition({ widgetName, top, left }) {
  return widgetPositionsDao.createWidgetPosition({ widgetName, top, left });
}

function deleteWidgetPosition(widgetName) {
  return widgetPositionsDao.deleteWidgetPosition(widgetName);
}

module.exports = {
  getAllWidgetPositions: getAllWidgetPositions,

  updateWidgetPositions: updateWidgetPositions,

  createWidgetPosition: createWidgetPosition,

  deleteWidgetPosition: deleteWidgetPosition,
};
