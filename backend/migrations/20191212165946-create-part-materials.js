'use strict'
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Part_Materials', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            HouseDetailsId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            MaterialsId: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Part_Materials')
    },
}
