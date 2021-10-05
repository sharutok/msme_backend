"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vendor_masters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      supplier_number: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      organization: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      supplier_name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      type: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      created_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      inactive_date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("vendor_masters");
  },
};
