module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    organisation_id: DataTypes.INTEGER,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'employees',
    timestamps: false
  });

  Employee.associate = (models) => {
    Employee.belongsToMany(models.Team, {
      through: models.EmployeeTeam,
      foreignKey: 'employee_id',
      otherKey: 'team_id',
      as: 'teams'
    });
    Employee.hasMany(models.EmployeeTeam, { foreignKey: 'employee_id' });
  };

  return Employee;
};
