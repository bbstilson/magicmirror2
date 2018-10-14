'use strict';

const WidgetPositionsConfig = require('../widgetPositionsConfig.js');

function widgetToRow({ name, description, width, height }) {
  return {
    name,
    description,
    width,
    height,
    top: 0,
    left: 0,
    active: false,
    created_at: new Date(),
    updated_at: new Date(),
  };
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      WidgetPositionsConfig.TABLE_NAME,
      WidgetPositionsConfig.WIDGETS.map(widgetToRow),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('widget_positions', null, {});
  }
};
