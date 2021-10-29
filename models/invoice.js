"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Invoice.init(
    {
      customerName: DataTypes.STRING,
      vehicleNumber: DataTypes.STRING,
      timeIn: DataTypes.DATETIME,
      timeOut: DataTypes.DATETIME,
      employeeName: DataTypes.STRING,
      totalAmount: DataTypes.INTEGER,
      pendingAmount: DataTypes.INTEGER,
      status: DataTypes.ENUM("pending", "inprogress", "complete"),
    },
    {
      sequelize,
      modelName: "Invoice",
    }
  );
  return Invoice;
};
