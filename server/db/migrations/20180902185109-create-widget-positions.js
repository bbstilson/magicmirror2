'use strict';

/*
CREATE TABLE widget_positions (
  widget_name PRIMARY KEY TEXT,
  top INTEGER NOT NULL,
  left INTEGER NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP NOT NULL
);
*/

const TABLE_NAME = 'widget_positions';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(TABLE_NAME, {
      widgetName: {
        primaryKey: true,
        type: Sequelize.TEXT,
        field: 'widget_name',
      },
      top: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      left: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
