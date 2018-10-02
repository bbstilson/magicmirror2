'use strict';

const TABLE_NAME = 'widget_positions';

module.exports = (sequelize, DataTypes) => {
  const WidgetPositions = sequelize.define(TABLE_NAME, {
    widgetName: {
      primaryKey: true,
      type: DataTypes.TEXT,
      field: 'widget_name',
    },
    top: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    left: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  }, {
    // this isn't working ..D:
    indexes: [{
      name: `${TABLE_NAME}_widget_name`,
      fields: ['widget_name'],
    }]
  });

  // WidgetPositions.associate = function(models) {
  //   // associations can be defined here
  // };

  return WidgetPositions;
};
