// models/disease.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    static associate(models) {
      // Define associations here if needed in the future
    }
  }
  Disease.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    effects: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Disease',
    tableName: 'diseases',
    timestamps: false // Disable timestamps for this model
  });

  Disease.associate = function(models) {
    Disease.hasMany(models.History, { foreignKey: 'diseaseId' });
};

  return Disease;
};
