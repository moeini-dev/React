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
        isIn: [['succeed', 'pending', 'failed']]
      }
    },
    amount: {
      type: DataTypes.FLOAT(5, 2),
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: true,
  });

  Order.associate = models => {
    Order.belongsTo(models.book, {
      foreignKey: 'bookIsbn',
      targetKey: 'isbn'
    });
    // Order.belongsTo(models.payment);
    Order.belongsTo(models.user, {
      foreignKey: 'userUuid',
      targetKey: 'uuid'
    })
  }

  return Order;
}