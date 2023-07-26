'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('review', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      reviewText: {
        type: DataTypes.STRING(2048),
        allowNull: false,
        validate: {
          len: {
            args: [1, 2048],
            msg: "The review should have a minimum of 1 character and a maximum of 2048 characters"
          }
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }, {
      freezeTableName: true,
      timestamps: true,
      updatedAt: false
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('review');
  }
};


