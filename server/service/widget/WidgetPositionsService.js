const widgetPositionsDao = require('../../dao/widget/WidgetPositionsDao.js');

module.exports = {
  getAllWidgetPositions: function getAllWidgetPositions() {
    return widgetPositionsDao.getAllWidgetPositions();
  },

  updateWidgetPositions: function updateWidgetPositions(widgets) {
    return Promise.all(widgets.map(widgetPositionsDao.updateWidgetPosition));
  },

  createWidgetPosition: function createWidgetPosition({ widgetName, top, left }) {
    return widgetPositionsDao.createWidgetPosition({ widgetName, top, left });
  },

  deleteWidgetPosition: function deleteWidgetPosition(widgetName) {
    return widgetPositionsDao.deleteWidgetPosition(widgetName);
  },
}
