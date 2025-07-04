module.exports = (sequelize, DataTypes) => {
  const PasswordResetToken = sequelize.define('PasswordResetToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  PasswordResetToken.associate = models => {
    PasswordResetToken.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return PasswordResetToken;
};
