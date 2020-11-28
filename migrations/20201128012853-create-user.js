'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userName: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      isParentMember: {
        type: Sequelize.BOOLEAN
      },
      careAgeStart: {
        type: Sequelize.INTEGER
      },
      careAgeEnd: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};