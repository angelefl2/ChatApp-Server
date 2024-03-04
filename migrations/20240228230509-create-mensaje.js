'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('mensajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      de: {
        type: Sequelize.STRING
      },
      para: {
        type: Sequelize.STRING
      },
      mensaje: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('mensajes');
  }
};