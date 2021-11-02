const connectToDatabase = require("../database/dbConnection");
const departmentsModel = require("../models/departments");
const DepartmentDetailsModel = require("../models/departmentDetails");

module.exports.getDepartmentWithDetail = async () => {
  let result = null;
  try {
    const { sequelize, Sequelize } = await connectToDatabase();
    const departments = await departmentsModel(sequelize, Sequelize);

    const departmentDetails = await DepartmentDetailsModel(
      sequelize,
      Sequelize
    );

    departments.hasMany(departmentDetails, {
      foreignKey: "deptId",
      as: "departmentDetails",
    });

    const departmentsData = departments.findAll({
      attributes: ["id"],
      include: [
        {
          attributes: ["deptId", "type", "createdAt", "updatedAt"],
          model: departmentDetails,
          as: "departmentDetails",
        },
      ],
    });
    result = departmentsData;
  } catch (error) {
    console.log("Error ==== ", error);
    result = error;
  }
  return result;
};
