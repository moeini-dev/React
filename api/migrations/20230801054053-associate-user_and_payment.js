'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('payment', 'userUuid', {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'user',
        key: 'uuid'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeConstraint('payment', 'payment_userUuid_foreign_idx');
    await queryInterface.removeColumn('payment', 'userUuid');
  }
};
