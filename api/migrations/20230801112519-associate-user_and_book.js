'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('User_Book', {
      userUuid: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'uuid'
        }
      },
      bookIsbn: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: 'book',
          key: 'isbn'
        }
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('User_Book');
  }
};
