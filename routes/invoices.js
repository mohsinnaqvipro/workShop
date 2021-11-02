const express = require("express");
const bodyParser = require("body-parser");
const dbHandler = require("../database/dbHandler");
const { response } = require("../helpers/response");
const { getErrorResponse } = require("../helpers/common");
const invoiceRouter = express.Router();
const joi = require("joi");

invoiceRouter.use(bodyParser.json());

invoiceRouter
  .route("/")
  .get(async (req, res, next) => {
    let result;
    try {
      result = await dbHandler.getItems("invoice");
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
      const { error } = saveInvoiceSchema(parseData);

      if (error) {
        console.log("Enter in post request Error");
        return getErrorResponse(error, res);
      }

      result = await dbHandler.addItem("invoice", parseData);
      return response(true, "Successfully Added", result, res);
    } catch (error) {
      console.log("Error = ", error);
      return response(false, "Faild to Save", error, res);
    }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /Users");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("DELETE operation not supported on /Users");
  });

const saveInvoiceSchema = (data) => {
  let schema = joi
    .object({
      customerName: joi.string().required(),
      vehicleNumber: joi.string().required(),
      timeIn: joi.string().isoDate().required(),
      timeOut: joi.string().isoDate().required(),
      employeeName: joi.string().required(),
      totalAmount: joi.number().required,
      status: joi
        .string()
        .valid("pending", "inprogress", "complete")
        .required(),
    })
    .options({
      abortEarly: false,
    });
  return schema.validate(data);
};

module.exports = invoiceRouter;
