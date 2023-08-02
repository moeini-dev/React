'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, DataTypes) {
        await queryInterface.addColumn('user', 'refreshToken', {
            type: DataTypes.STRING(1000)
        });
    },
    async down(queryInterface, DataTypes) {
        await queryInterface.removeColumn('user', 'refreshToken');
    }
};
