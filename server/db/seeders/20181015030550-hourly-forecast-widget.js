'use strict';

const WidgetPositionsConfig = require('../widgetPositionsConfig.js');

const HourlyForecastWidget = {
  name: 'Hourly Forecast',
  description: 'Displays the weather forecast for the next 12 hours, including an an icon to display the current conditions, the minimum temperature and the maximum temperature.',
  width: 2,
  height: 4,
};

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      WidgetPositionsConfig.TABLE_NAME,
      [ HourlyForecastWidget ].map(WidgetPositionsConfig.widgetToRow)
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete(
      WidgetPositionsConfig.TABLE_NAME,
      { 
        // Delete by name.
        name: 'Hourly Forecast'
      }
    );
  }
};
