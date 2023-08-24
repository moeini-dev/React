'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.addColumn('book', 'isFeatured', {
      type: DataTypes.BOOLEAN,
      allownull: false,
      defaultValue: 0,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'Invalid input: Use 1 for featured book -- 0 for ordinary book'
        }
      }
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeColumn('book', 'isFeatured');
  }
};
