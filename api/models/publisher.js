module.exports = (sequelize, DataTypes) => {
  const Publisher = sequelize.define('publisher', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })

  Publisher.associate = models => {
    Publisher.hasMany(models.book);
  }

  return Publisher;
}