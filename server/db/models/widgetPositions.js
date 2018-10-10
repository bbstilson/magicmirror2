'use strict';

const WidgetPositionsConfig = require('../widgetPositionsConfig.js');

module.exports = (sequelize, _Datatypes) => {
  const WidgetPositions = sequelize.define(
    WidgetPositionsConfig.TABLE_NAME,
    WidgetPositionsConfig.WIDGET_POSITION_MODEL,
    {
      // TODO: this isn't working ..D:
      indexes: [{
        name: `${WidgetPositionsConfig.TABLE_NAME}_widget_name`,
        fields: ['widget_name'],
      }]
    }
  );

  return WidgetPositions;
};
