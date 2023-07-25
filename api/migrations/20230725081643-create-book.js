'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('book', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      isbn: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      publicationYear: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
      { freezeTableName: true });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('book');
  }
};