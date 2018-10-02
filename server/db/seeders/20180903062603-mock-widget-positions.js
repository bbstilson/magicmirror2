'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('widget_positions', [{
      widget_name: 'foo',
      top: 0,
      left: 0,
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      widget_name: 'bar',
      top: 50,
      left: 50,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('widget_positions', null, {});
  }
};
