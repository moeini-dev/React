'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('genre', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    }, {
      freezeTableName: true,
      timestamps: false
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('genre');
  }
};