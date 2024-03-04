'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      email: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      online: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Usuarios');
  }
};