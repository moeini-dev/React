module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('genre', {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return Genre;
}