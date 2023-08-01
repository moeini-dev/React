module.exports = (sequelize, DataTypes) => {
  const Book_Genre = sequelize.define('book_genre', {
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

  return Book_Genre;
}