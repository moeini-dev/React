'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.DATE
      }
    },
      { freezeTableName: true });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('user');
  }
};