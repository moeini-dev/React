'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('book', 'translatorId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'translator',
        key: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.removeConstraint('book', 'book_translatorId_foreign_idx');
    await queryInterface.removeColumn('book', 'translatorId');
  }
};
