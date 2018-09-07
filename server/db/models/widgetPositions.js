'use strict';

const TABLE_NAME = 'widget_positions';

module.exports = (sequelize, DataTypes) => {
  const WidgetPositions = sequelize.define(TABLE_NAME, {
    widgetName: {
      type: DataTypes.TEXT,
      field: 'widget_name',
    },
    top: DataTypes.INTEGER,
    left: DataTypes.INTEGER,
  }, {
    // this isn't working D:
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
