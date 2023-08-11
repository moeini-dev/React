'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('order', 'amount', {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn('order', 'amount');
  }
};
