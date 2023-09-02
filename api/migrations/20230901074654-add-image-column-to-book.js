'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('book', 'image', {
      type: DataTypes.STRING,
      defaultValue: 'noImage.png'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn('book', 'image')
  }
};
