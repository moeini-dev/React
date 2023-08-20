'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('book_genre', {
      bookIsbn: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        references: {
          model: 'book',
          key: 'isbn'
        }
      },
      genreId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'genre',
          key: 'id'
        }
      }
    }, {
      timestamps: false,
      freezeTableName: true
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('book_genre');
  }
};