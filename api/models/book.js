module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    isbn: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publicationYear: {
      type: DataTypes.INTEGER
    },
    price: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, { freezeTableName: true });

  Book.associate = models => {
    Book.belongsTo(models.author);
    Book.belongsTo(models.publisher);
    Book.belongsTo(models.translator);
  }
  return Book;
}