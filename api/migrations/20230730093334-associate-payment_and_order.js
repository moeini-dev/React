'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('order', 'paymentId', {
      type: DataTypes.UUID,
      unique: true,
      references: {
        model: 'payment',
        key: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.removeConstraint('order', 'order_paymentId_foreign_idx');
    await queryInterface.removeColumn('order', 'paymentId');
  }
};
