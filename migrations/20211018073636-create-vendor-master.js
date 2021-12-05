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
      },
      organization: {
        type: Sequelize.STRING,
      },
      supplier_name: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      created_date: {
        type: Sequelize.STRING,
      },
      certificate_no: {
        type: Sequelize.STRING,
      },
      certificate_agency: {
        type: Sequelize.STRING,
      },
      certificate_expiration_date: {
        type: Sequelize.STRING,
      },
      certificate_registration_date: {
        type: Sequelize.STRING,
      },
      vendor_email: {
        type: Sequelize.STRING,
        // validate: {
        //   isEmail: true,
        // },
      },
      remarks: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: false,
      },
      delete_flag: {
        type: Sequelize.STRING,
        defaultValue: false
      }
      ,
      isMSME_flag: {
        type: Sequelize.STRING,
        
        
      },
      remarks: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("vendor_master");
  },
};
