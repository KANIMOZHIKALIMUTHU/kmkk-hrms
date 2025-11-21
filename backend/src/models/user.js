const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    organisation_id: { type: DataTypes.INTEGER, allowNull: false },
    email: { type: DataTypes.STRING, unique: 'compositeIndex', allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  });
  return User;
};
