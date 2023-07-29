'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('book', 'about', {
      type: DataTypes.TEXT
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn('book', 'about');
  }
};
