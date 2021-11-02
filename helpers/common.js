const { response } = require("../helpers/response");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports.getErrorResponse = (message, res) => {
  let errorArray = [];
  let errorMessage = message.details;

  errorArray = errorMessage.map((msg) => ({
    message: msg.message.split(":")[1]
      ? msg.message.split(":")[1]
      : msg.message,
    key: msg.context.key,
  }));

  return response(false, "Validation Failed", errorArray, res);
};

module.exports.isAuthorized = (token) => {
  if (!token) return false;
  const sessionToken = token.slice(7);
  const decoded = jwt.verify(sessionToken, keys.secretOrKey);
  console.log("Decoded ==== ", decoded);
  try {
    // return decoded.accessRights[resource][action];
    return decoded;
  } catch (error) {
    return false;
  }
};
