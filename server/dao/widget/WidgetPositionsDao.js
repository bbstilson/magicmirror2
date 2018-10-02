const sequelize = require('../../db/models/index.js').sequelize;
const WidgetPositions = sequelize.import('../../db/models/widgetPositions.js');

module.exports = {
  getAllWidgetPositions: function getAllWidgetPositions() {
    return WidgetPositions.findAll();
  }
}

