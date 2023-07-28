'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('book', 'publisherId', {
      type: DataTypes.INTEGER,
      references: {
        model: 'publisher',
        key: 'id'
      },
      onDelete: 'NO ACTION',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, DataTypes) {
    // await queryInterface.removeConstraint('book', 'book_publisherId_foreign_idx');
    await queryInterface.removeColumn('book', 'publisherId');
  }
};
