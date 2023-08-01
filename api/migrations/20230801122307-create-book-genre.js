'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('book_genre', {
      bookIsbn: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        references: {
          model: 'book',
          key: 'isbn'
        }
      },
      genreId: {
        type: Sequelize.INTEGER,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('book_genre');
  }
};