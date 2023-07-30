module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('payment', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false
  });

  Payment.associate = models => {
    Payment.hasOne(models.order);
  }

  return Payment;
}