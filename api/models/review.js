module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    reviewText: {
      type: DataTypes.STRING(2048),
      allowNull: false,
      validate: {
        len: {
          args: [1, 2048],
          msg: "The review should have a minimum of 1 character and a maximum of 2048 characters"
        }
      }
    }
  }, {
    freezeTableName: true,
    timestamps: true,
    updatedAt: false
  });

  Review.associate = models => {
    Review.belongsTo(models.user, {
      foreignKey: 'userUuid',
      targetKey: 'uuid'
    });
    Review.belongsTo(models.book, {
      foreignKey: 'bookIsbn',
      targetKey: 'isbn'
    })
  }

  return Review;
}

