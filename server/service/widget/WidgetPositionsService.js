const widgetPositionsDao = require('../../dao/widget/WidgetPositionsDao.js');

function getAllWidgetPositions() {
  return widgetPositionsDao.getAllWidgetPositions();
}

function updateWidgetPositions(widgets) {
  return Promise.all(widgets.map(widgetPositionsDao.updateWidgetPositions));
}

module.exports = {
  getAllWidgetPositions: getAllWidgetPositions,

  updateWidgetPositions: updateWidgetPositions,
};
