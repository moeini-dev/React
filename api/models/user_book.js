module.exports = (sequelize, DataTypes) => {
  const User_Book = sequelize.define('user_book', {
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
  return User_Book;
}