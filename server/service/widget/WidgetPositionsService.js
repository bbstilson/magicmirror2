const widgetPositionsDao = require('../../dao/widget/WidgetPositionsDao.js');

function getAllWidgetPositions() {
  return widgetPositionsDao.getAllWidgetPositions();
}

function updateWidgetPositions(positions) {
  return Promise.all(
    positions
      .map((position) => {
        const { id, top, left, active } = position;
        return active
          ? position
          // reset position to (0,0) if deactivating widget
          : { id, active, top: 0, left: 0 };
      })
      .map(widgetPositionsDao.updateWidgetPositions)
  );
}

module.exports = {
  getAllWidgetPositions: getAllWidgetPositions,

  updateWidgetPositions: updateWidgetPositions,
};
