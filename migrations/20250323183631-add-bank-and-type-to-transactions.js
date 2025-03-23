'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('transactions', 'bank', {
            type: Sequelize.STRING(55),
            allowNull: true,
        });

        await queryInterface.addColumn('transactions', 'transaction_type', {
            type: Sequelize.ENUM('credit', 'debit', 'investment'),
            allowNull: false,
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('transactions', 'bank');
        await queryInterface.removeColumn('transactions', 'transaction_type');
    }
};
