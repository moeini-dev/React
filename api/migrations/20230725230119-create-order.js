'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('order', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['completed', 'pending', 'cancled']]
        }
      },
      amount: {
        type: DataTypes.FLOAT(5, 2),
        allowNull: false
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
    await queryInterface.dropTable('order');
  }
};