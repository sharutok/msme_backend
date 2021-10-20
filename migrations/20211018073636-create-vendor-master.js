"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("vendor_master", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      supplier_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      organization: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      supplier_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      inactive_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      classification: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      certificate_no: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      certificate_agency: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      certificate_expiration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      certificate_registration_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pending",
      },
      vendor_email: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
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
    await queryInterface.dropTable("vendor_master");
  },
};
