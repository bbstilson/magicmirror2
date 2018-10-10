const Sequelize = require('sequelize');

const TABLE_NAME = 'widget_positions';

/*
CREATE TABLE widget_positions (
  widget_name PRIMARY KEY TEXT,
  display_name TEXT NOT NULL,
  description TEXT NOT NULL,
  top INTEGER NOT NULL,
  left INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  active BOOLEAN,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
*/

const WIDGET_POSITION_MODEL = {
  widgetName: {
    primaryKey: true,
    type: Sequelize.TEXT,
    field: 'widget_name',
  },
  displayName: {
    type: Sequelize.TEXT,
    field: 'display_name',
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  top: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  left: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  width: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  height: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN
  },
  createdAt: {
    type: Sequelize.DATE,
    field: 'created_at',
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    field: 'updated_at',
    allowNull: false,
  },
};

const CalendarWidget = {
  widgetName: 'calendar',
  displayName: 'Calendar',
  description: 'Displays a calendar with the current day highlighted.',
  width: 2,
  height: 4
};

const ClockWidget = {
  widgetName: 'clock',
  displayName: 'Clock',
  description: 'Displays the current time.',
  width: 4,
  height: 15
};

const ComplimentsWidget = {
  widgetName: 'compliments',
  displayName: 'Compliments',
  description: 'Displays a random compliment 😊',
  width: 1.1,
  height: 15
};

const CurrentWeatherWidget = {
  widgetName: 'currentWeather',
  displayName: 'Current Weather',
  description: 'Displays the current weather, which includes the temperature and an icon to display the current conditions.',
  width: 8,
  height: 8
};

const NewsFeedWidget = {
  widgetName: 'newsFeed',
  displayName: 'News Feed',
  description: 'Displays news recent news headlines.',
  width: 1,
  height: 8
};

const TodayWidget = {
  widgetName: 'today',
  displayName: 'Today',
  description: 'Displays the current day and date.',
  width: 1.5,
  height: 15
};

const WeatherForecastWidget = {
  widgetName: 'weatherForecast',
  displayName: 'Weather Forecast',
  description: 'Displays the weather forecast for the coming week, including an an icon to display the current conditions, the minimum temperature and the maximum temperature.',
  width: 2,
  height: 4,
};


module.exports.WIDGET_POSITION_MODEL = WIDGET_POSITION_MODEL;

module.exports.TABLE_NAME = TABLE_NAME;

module.exports.WIDGETS = [
  CalendarWidget,
  ClockWidget,
  ComplimentsWidget,
  CurrentWeatherWidget,
  NewsFeedWidget,
  TodayWidget,
  WeatherForecastWidget,
];
