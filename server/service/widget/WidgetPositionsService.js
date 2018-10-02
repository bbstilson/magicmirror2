const widgetPositionsDao = require('../../dao/widget/WidgetPositionsDao.js');

module.exports = {
  getAllWidgetPositions: function getAllWidgetPositions() {
    return widgetPositionsDao.getAllWidgetPositions();
  },

  updateWidgetPosition: function updateWidgetPosition({ widgetName, top, left }) {
    return widgetPositionsDao.updateWidgetPosition({ widgetName, top, left });
  },

  createWidgetPosition: function createWidgetPosition({ widgetName, top, left }) {
    return widgetPositionsDao.createWidgetPosition({ widgetName, top, left });
  },

  deleteWidgetPosition: function deleteWidgetPosition(widgetName) {
    return widgetPositionsDao.deleteWidgetPosition(widgetName);
  },
}
