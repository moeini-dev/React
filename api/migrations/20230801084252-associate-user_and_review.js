'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('review', 'userUuid', {
      type: DataTypes.UUID,
      references: {
        model: 'user',
        key: 'uuid'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.removeConstraint('review', 'review_userUuid_foreign_idx');
    await queryInterface.removeColumn('review', 'userUuid');
  }
};
