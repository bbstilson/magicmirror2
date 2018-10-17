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

module.exports.WIDGET_POSITION_MODEL = WIDGET_POSITION_MODEL;

module.exports.TABLE_NAME = TABLE_NAME;

module.exports.widgetToRow = function widgetToRow({ name, description, width, height }) {
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
