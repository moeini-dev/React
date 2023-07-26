'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('book', 'authorId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'author',
        key: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.removeConstraint('book', 'book_authorId_foreign_idx');
    await queryInterface.removeColumn('book', 'authorId');
  }
};
