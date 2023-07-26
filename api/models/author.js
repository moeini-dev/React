module.exports = (sequelize, DataTypes) => {
  const Author = sequelize.define('author', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, { freezeTableName: true });

  Author.associate = models => {
    Author.hasMany(models.book)
  }
  return Author;
}