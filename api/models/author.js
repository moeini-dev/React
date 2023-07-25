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
  }, { freezeTableName: true })
  return Author;
}