module.exports = (sequelize, DataTypes) => {
  const Translator = sequelize.define('translator', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: false
  })
  return Translator;
}