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
      },
      organization: {
        type: DataTypes.STRING,
      },
      supplier_name: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      created_date: {
        type: DataTypes.STRING,
      },
      certificate_no: {
        type: DataTypes.STRING,
      },
      certificate_agency: {
        type: DataTypes.STRING,
      },
      certificate_expiration_date: {
        type: DataTypes.STRING,
      },
      certificate_registration_date: {
        type: DataTypes.STRING,
      },
      vendor_email: {
        type: DataTypes.STRING,
        // validate: {
        //   isEmail: true,
        // },
      },
      remarks: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: false,

      },
      delete_flag: {
        type: DataTypes.STRING,
        defaultValue: false
      }
      ,
      isMSME_flag: {
        type: DataTypes.STRING,
        defaultValue: true
      },
      remarks: {
        type: DataTypes.STRING,
      }
    },
    {
      sequelize,
      tableName: "vendor_master",
      modelName: "vendor_master",
    }
  );
  return vendor_master;
};
