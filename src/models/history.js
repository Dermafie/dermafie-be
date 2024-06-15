// models/history.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, { foreignKey: 'userId' });
      History.belongsTo(models.Disease, { foreignKey: 'diseaseId' });
    }
  }
  History.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // 'users' refers to the table name
        key: 'id'
      }
    },
    diseaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'diseases', // 'diseases' refers to the table name
        key: 'id'
      }
    },
    scanDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    imageURL: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    result: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'history',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  });
  return History;
};
