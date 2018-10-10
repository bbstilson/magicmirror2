'use strict';

const WidgetPositionsConfig = require('../widgetPositionsConfig.js');

function widgetToRow({ widgetName, displayName, description, width, height }) {
  return {
    description,
    width,
    height,
    widget_name: widgetName,
    display_name: displayName,
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
      'widget_positions',
      WidgetPositionsConfig.WIDGETS.map(widgetToRow),
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('widget_positions', null, {});
  }
};
