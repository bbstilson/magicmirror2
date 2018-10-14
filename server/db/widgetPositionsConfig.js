const Sequelize = require('sequelize');

const TABLE_NAME = 'widget_positions';

/*
CREATE TABLE widget_positions (
  id PRIMARY KEY INTEGER AUTOINC,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  top INTEGER NOT NULL,
  left INTEGER NOT NULL,
  width INTEGER NOT NULL,
  height INTEGER NOT NULL,
  active BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
*/

const WIDGET_POSITION_MODEL = {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.TEXT,
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
    type: Sequelize.BOOLEAN,
    allowNull: false,
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
