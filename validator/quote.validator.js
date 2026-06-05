const joi = require("joi");

module.exports = function (data) {
  const schema = joi.object({
    text: joi.string().min(5).max(1000).required(),
    author_name: joi.string().required(),
    book_id: joi.string().hex().length(24).required(),
  });

  return schema.validate(data);
};
