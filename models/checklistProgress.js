// models/checklistProgress.js
module.exports = (sequelize, DataTypes) => {
  const ChecklistProgress = sequelize.define('ChecklistProgress', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    progress: {
      type: DataTypes.JSONB, // store the checkbox state map
      defaultValue: {},
    },
  });

  return ChecklistProgress;
};
