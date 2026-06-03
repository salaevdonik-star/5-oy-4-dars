const joi = require("joi");

module.exports = function (data, type) {
  let schema;

  if (type === "register") {
    schema = joi.object({
      username: joi.string().min(3).max(30).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });
  } else if (type === "login") {
    schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });
  }

  return schema.validate(data);
};
