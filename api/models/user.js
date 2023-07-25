// const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./index');
require('dotenv').config();

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USERNAME,
//   process.env.DB_PASSWORD,
//   { dialect: 'mysql' }
// );

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {

//     static associate(models) {
//       // define association here
//     }
//   }
//   User.init({
//     uuid: DataTypes.UUID,
//     username: DataTypes.STRING,
//     password: DataTypes.STRING,
//     email: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    uuid: {
      type: DataTypes.UUID,
      allownull: false,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allownull: false,
    },
    email: {
      type: DataTypes.STRING,
      allownull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Enter a valid email'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allownull: false,
      defaultValue: 0,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'Invalid input: Use 1 for Admin -- 0 for Customer'
        }
      }
    }
  },
    { freezeTableName: true })
  return User;
}