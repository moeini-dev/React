'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('review', 'bookId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'book',
        key: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.removeConstraint('review', 'review_bookId_foreign_idx');
    await queryInterface.removeColumn('review', 'bookId');
  }
};
