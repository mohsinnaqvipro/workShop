"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("invoice", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerName: {
        type: Sequelize.STRING,
      },
      vehicleNumber: {
        type: Sequelize.STRING,
      },
      timeIn: {
        type: Sequelize.DATE,
      },
      timeOut: {
        type: Sequelize.DATE,
      },
      employeeName: {
        type: Sequelize.STRING,
      },
      totalAmount: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM("pending", "inprogress", "complete"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("invoice");
  },
};
