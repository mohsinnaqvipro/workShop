"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("salaries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      empId: {
        type: Sequelize.INTEGER,
      },
      empName: {
        type: Sequelize.STRING,
      },
      salleryAmount: {
        type: Sequelize.INTEGER,
      },
      workDays: {
        type: Sequelize.INTEGER,
      },
      perDayAmount: {
        type: Sequelize.INTEGER,
      },
      casualLeaves: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("salaries");
  },
};
