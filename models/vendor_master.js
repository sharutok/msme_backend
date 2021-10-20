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
      supplier_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      supplier_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      inactive_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      classification: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      certificate_no: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      certificate_agency: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      certificate_expiration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      certificate_registration_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: true,
        validate: {
          customValidators(value) {
            if (value === "") {
              this.status = "Pending";
            }
          },
        },
      },
      vendor_email: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      sequelize,
      tableName: "vendor_master",
      modelName: "vendor_master",
    }
  );
  return vendor_master;
};
