"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class vendor_master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  vendor_master.init(
    {
      supplier_number: { type: DataTypes.STRING, unique: true },
      organization: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      supplier_name: { type: DataTypes.TEXT, allowNull: false },
      type: { type: DataTypes.TEXT, allowNull: false },
      created_date: { type: DataTypes.STRING, allowNull: false },
      inactive_date: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "vendor_master",
    }
  );
  return vendor_master;
};
