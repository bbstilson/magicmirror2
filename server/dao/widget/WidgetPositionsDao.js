const sequelize = require('../../db/models/index.js').sequelize;
const WidgetPositions = sequelize.import('../../db/models/widgetPositions.js');

function getAllWidgetPositions() {
  return WidgetPositions.findAll();
}

function updateWidgetPositions({ widgetName, top, left, active }) {
  return WidgetPositions
    .findById(widgetName)
    .then((widget) => widget
      ? widget.update({ top, left, active })
      : Promise.reject({
        errorCode: 1,
        errorText: `Invalid widgetName: ${widgetName}`
      })
    );
}

module.exports = {
  getAllWidgetPositions: getAllWidgetPositions,

  updateWidgetPositions: updateWidgetPositions,
};
