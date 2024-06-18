// models/history.js
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.CHAR(36),
            allowNull: false
        },
        diseaseId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        scanDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        imageURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        scanResult: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'history',
        timestamps: true
    });
  
    History.associate = function(models) {
      History.belongsTo(models.User, {
          foreignKey: 'userId',
          as: 'user'
      });
      History.belongsTo(models.Disease, {
          foreignKey: 'diseaseId',
          as: 'disease'
      });
  };
  
    return History;
  };
  