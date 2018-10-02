const sequelize = require('../../db/models/index.js').sequelize;
const WidgetPositions = sequelize.import('../../db/models/widgetPositions.js');

module.exports = {
  getAllWidgetPositions: function getAllWidgetPositions() {
    return WidgetPositions.findAll();
  },

  updateWidgetPosition: function updateWidgetPosition({ widgetName, top, left }) {
    return WidgetPositions
      .findById(widgetName)
      .then((widget) => widget ? widget.update({ top, left }) : Promise.reject(0));
  },

  createWidgetPosition: function createWidgetPosition({ widgetName, top, left }) {
    return WidgetPositions.create({ widgetName, top, left });
  },

  deleteWidgetPosition: function deleteWidgetPosition(widgetName) {
    return WidgetPositions
      .findById(widgetName)
      .then((widget) => widget ? widget.destroy() : Promise.reject(0));
  },
}

