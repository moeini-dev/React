'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('order', 'bookIsbn', {
      type: DataTypes.BIGINT,
      references: {
        model: 'book',
        key: 'isbn'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.removeConstraint('order', 'order_bookId_foreign_idx');
    await queryInterface.removeColumn('order', 'bookIsbn');
  }
};
