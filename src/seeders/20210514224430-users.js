const bcrypt = require('bcrypt');

'use strict';
const password = bcrypt.hashSync('123456', 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({
      tableName: 'users'
    }, [{
      names: 'Alejandro',
      last_names: 'Jimenez',
      email: 'alejo.mateus.ud@gmail.com',
      password,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
