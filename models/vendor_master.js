'use strict';
const {
  Model
} = require('sequelize');
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
  };
  vendor_master.init({
    supplier_number: DataTypes.STRING,
    organization: DataTypes.TEXT,
    supplier_name: DataTypes.TEXT,
    type: DataTypes.TEXT,
    created_date: DataTypes.STRING,
    inactive_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'vendor_master',
  });
  return vendor_master;
};