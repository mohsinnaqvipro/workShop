const express = require("express");
const bodyParser = require("body-parser");
const dbHandler = require("../database/dbHandler");
const { response } = require("../helpers/response");
const { getErrorResponse, isAuthorized } = require("../helpers/common");
const departmentRouter = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const { getDepartmentWithDetail } = require("../middlewares/departmentLogic");

departmentRouter.use(bodyParser.json());

departmentRouter
  .route("/")
  .get(async (req, res, next) => {
    let result;
    try {
      let token = req.headers.authorization;
      let verifyToken = isAuthorized(token);
      console.log("Verify Token ====== ", verifyToken);

      result = await getDepartmentWithDetail();

      return response(true, "Successfully Retrieved", result, res);
    } catch (error) {
      console.log("Error = ", error);
      return response(false, "Faild to retrieved", error, res);
    }
  })
  .post(async (req, res, next) => {
    let result;
    try {
      let data = JSON.stringify(req.body);
      let parseData = JSON.parse(data);
      const { error } = saveUserSchema(parseData);
      if (error) {
        console.log("Enter in post request Error");
        return getErrorResponse(error, res);
      }

      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(parseData.password, salt);
      parseData.password = hash;
      parseData.salt = salt;

      parseData.accountStatus = "active";
      result = await dbHandler.addItem("user", parseData);
      return response(true, "Successfully Added", result, res);
    } catch (error) {
      console.log("Error = ", error);
      return response(false, "Faild to Save", error, res);
    }
  });

const saveUserSchema = (user) => {
  let schema = joi
    .object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
    })
    .options({
      abortEarly: false,
    });
  return schema.validate(user);
};

module.exports = departmentRouter;
