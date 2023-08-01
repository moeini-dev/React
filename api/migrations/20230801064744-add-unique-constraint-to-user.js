'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    // await queryInterface.changeColumn('user', 'uuid', {
    //   type: DataTypes.UUID,
    //   unique: true,
    //   allownull: false,
    //   defaultValue: DataTypes.UUIDV4,
    // });

    await queryInterface.addIndex('user', {
      fields: ['uuid'],
      name: 'uuid_customIndex'
    })
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.removeIndex('user', 'uuid_customIndex');
  }
};
