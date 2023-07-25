module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['completed', 'pending', 'cancled']]
      }
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false
  })
  return Order;
}