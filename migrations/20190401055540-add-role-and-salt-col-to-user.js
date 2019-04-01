'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "role", Sequelize.STRING)
    .then(() => {
      return queryInterface.addColumn("Users", "salt", Sequelize.STRING)
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Users", "salt")
    .then(() => {
      return queryInterface.removeColumn("Users", "role")
    })
  }
};
