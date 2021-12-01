"use strict";
const { Model } = require("sequelize");
const brypt = require("bcrypt");
// const cryptoRandomString = require('crypto-random-string')
const crypto = require('crypto')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,

      },
      verify_password: {
        type: DataTypes.STRING,
        validate: {
          checkPassword() {
            if (this.password !== this.verify_password) {
              console.log(this.password, this.verify_password);
              throw new Error(" passwords donot match");
            } else {
              this.password = brypt.hashSync(this.password, 12)
              this.verify_password = "";
            }
          },

        },
      },
      otp: {
        type: DataTypes.STRING,
      },
      plant: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.STRING,
        defaultValue: true
      },
      role: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      tableName: "user",
      modelName: "User",
    }
  );
  // User.beforeCreate(async (user, option) => {
  //   user.password = await brypt.hash(user.password, 12);
  // });

  User.prototype.passwordResetOTP = function () {
    const OTP = crypto.randomBytes(3).toString("hex");
    this.otp = OTP;
    return OTP;
  };
  return User;
};
