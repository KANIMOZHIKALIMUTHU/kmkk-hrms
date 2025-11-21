module.exports = (sequelize, DataTypes) => {
  const EmployeeTeam = sequelize.define('EmployeeTeam', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employee_id: { type: DataTypes.INTEGER, allowNull: false },
    team_id: { type: DataTypes.INTEGER, allowNull: false },
    assigned_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'employee_teams',
    timestamps: false
  });

  EmployeeTeam.associate = (models) => {
    EmployeeTeam.belongsTo(models.Employee, { foreignKey: "employee_id" });
    EmployeeTeam.belongsTo(models.Team, { foreignKey: "team_id" });
  };

  return EmployeeTeam;
};
