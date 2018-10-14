'use strict';

const WidgetPositionsConfig = require('../widgetPositionsConfig.js');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      WidgetPositionsConfig.TABLE_NAME,
      WidgetPositionsConfig.WIDGET_POSITION_MODEL
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(
      WidgetPositionsConfig.TABLE_NAME
    );
  }
};
