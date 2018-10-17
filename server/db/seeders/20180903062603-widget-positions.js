'use strict';

const WidgetPositionsConfig = require('../widgetPositionsConfig.js');

const CalendarWidget = {
  name: 'Calendar',
  description: 'Displays a calendar with the current day highlighted.',
  width: 2,
  height: 4,
};

const ClockWidget = {
  name: 'Clock',
  description: 'Displays the current time.',
  width: 4,
  height: 15,
};

const ComplimentsWidget = {
  name: 'Compliments',
  description: 'Displays a random compliment 😊',
  width: 1.1,
  height: 15,
};

const CurrentWeatherWidget = {
  name: 'Current Weather',
  description: 'Displays the current weather, which includes the temperature and an icon to display the current conditions.',
  width: 8,
  height: 8,
};

const NewsFeedWidget = {
  name: 'News Feed',
  description: 'Displays news recent news headlines.',
  width: 1,
  height: 8,
};

const TodayWidget = {
  name: 'Today',
  description: 'Displays the current day and date.',
  width: 1.5,
  height: 15,
};

const WeatherForecastWidget = {
  name: 'Weather Forecast',
  description: 'Displays the weather forecast for the coming week, including an an icon to display the current conditions, the minimum temperature and the maximum temperature.',
  width: 2,
  height: 4,
};

const WIDGETS = [
  CalendarWidget,
  ClockWidget,
  ComplimentsWidget,
  CurrentWeatherWidget,
  NewsFeedWidget,
  TodayWidget,
  WeatherForecastWidget,
];

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      WidgetPositionsConfig.TABLE_NAME,
      WIDGETS.map(WidgetPositionsConfig.widgetToRow)
    );
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete(WidgetPositionsConfig.TABLE_NAME);
  }
};
