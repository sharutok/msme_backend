"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class image_uploader extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  image_uploader.init(
    {
      supplier_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      img_1_name: {//MSME Certificate

        type: DataTypes.STRING,
      },
      img_1_data: {
        type: DataTypes.BLOB('long'),
      },
      img_2_name: {//GST Certificate

        type: DataTypes.STRING,
      },
      img_2_data: {
        type: DataTypes.BLOB('long'),
      },
      img_3_name: { //PAN Card
        type: DataTypes.STRING,
      },
      img_3_data: {
        type: DataTypes.BLOB('long'),
      },
      delete_flag: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      tableName: "image_uploader",
      modelName: "image_uploader",
    }
  );
  return image_uploader;
};
