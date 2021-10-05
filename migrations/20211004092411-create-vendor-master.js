'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('vendor_masters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      supplier_number: {
        type: Sequelize.STRING
      },
      organization: {
        type: Sequelize.TEXT
      },
      supplier_name: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.TEXT
      },
      created_date: {
        type: Sequelize.STRING
      },
      inactive_date: {
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('vendor_masters');
  }
};