'use strict';

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM('admin', 'analyst'),
            allowNull: false,
            defaultValue: 'analyst'
        }
    }, {
        tableName: 'users',
        timestamps: true
    });

    User.associate = (models) => {
        User.hasMany(models.Transaction, { foreignKey: 'userId', as: 'transactions' });
    };

    return User;
};
