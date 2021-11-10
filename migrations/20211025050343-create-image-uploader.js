"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("image_uploader", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      supplier_number: {
        type: Sequelize.STRING,
      },
      img_1_name: {
        type: Sequelize.STRING,
      },
      img_1_data: {
        type: Sequelize.BLOB('long'),
      },
      img_2_name: {
        type: Sequelize.STRING,
      },
      img_2_data: {
        type: Sequelize.BLOB('long'),
      },
      img_3_name: {
        type: Sequelize.STRING,
      },
      img_3_data: {
        type: Sequelize.BLOB('long'),
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
    await queryInterface.dropTable("image_uploader");
  },
};
