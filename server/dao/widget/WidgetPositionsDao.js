const sequelize = require('../../db/models/index.js').sequelize;
const WidgetPositions = sequelize.import('../../db/models/widgetPositions.js');

function getAllWidgetPositions() {
  return WidgetPositions.findAll();
}

function updateOrCreateWidgetPosition({ widgetName, top, left }) {
  return WidgetPositions
    .findById(widgetName)
    .then((widget) => widget
      ? widget.update({ top, left })
      : createWidgetPosition({ widgetName, top, left }));
}

function createWidgetPosition({ widgetName, top, left }) {
  return WidgetPositions.create({ widgetName, top, left });
}

function deleteWidgetPosition(widgetName) {
  return WidgetPositions
    .findById(widgetName)
    .then((widget) => widget ? widget.destroy() : Promise.reject(0));
}

module.exports = {
  getAllWidgetPositions: getAllWidgetPositions,

  updateOrCreateWidgetPosition: updateOrCreateWidgetPosition,

  createWidgetPosition: createWidgetPosition,

  deleteWidgetPosition: deleteWidgetPosition,
};
