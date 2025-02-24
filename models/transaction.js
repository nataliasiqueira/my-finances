'use strict';

module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'transactions',
        timestamps: true
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    };

    return Transaction;
};
