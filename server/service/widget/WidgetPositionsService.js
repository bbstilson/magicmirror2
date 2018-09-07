const widgetPositionsDao = require('../../dao/widget/WidgetPositionsDao.js');

module.exports = {
  getAllWidgetPositions: function getAllWidgetPositions() {
    return widgetPositionsDao.getAllWidgetPositions();
  }
}
