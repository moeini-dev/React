module.exports = (sequelize, DataTypes) => {
  const Book_Genre = sequelize.define('book_genre', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    bookIsbn: {
      type: DataTypes.BIGINT,
      primaryKey: false,
      references: {
        model: 'book',
        key: 'isbn'
      }
    },
    genreId: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      references: {
        model: 'genre',
        key: 'id'
      }
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  Book_Genre.associate = models => {
    Book_Genre.belongsTo(models.book, { foreignKey: 'bookIsbn', targetKey: 'isbn' });
    Book_Genre.belongsTo(models.genre, { foreignKey: 'genreId', targetKey: 'id' })
  }

  return Book_Genre;
}