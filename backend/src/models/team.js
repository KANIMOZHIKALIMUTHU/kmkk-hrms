module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'teams',
    timestamps: false
  });

  Team.associate = (models) => {
    Team.belongsToMany(models.Employee, {
      through: models.EmployeeTeam,
      foreignKey: 'team_id',
      otherKey: 'employee_id',
      as: 'employees'
    });
    Team.hasMany(models.EmployeeTeam, { foreignKey: 'team_id' });
  };

  return Team;
};
