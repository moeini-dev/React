module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('genre', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  });

  Genre.associate = models => {
    Genre.belongsToMany(models.book, { through: 'book_genre', sourceKey: 'id', targetKey: 'isbn' });
  }

  return Genre;
}