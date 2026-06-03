const joi = require("joi");

const Periods = {
  TEMURID: "Temuriylar davri",
  JADID: "Jadid davri",
  UNION: "Sovet davri",
  INDEPENDENCE: "Mustaqillik davri",
};

const Genres = ["Fantastik", "Badiy", "Drama", "meladrama", "tarixiy", "diniy", "romantik", "roman"];

module.exports = function (data) {
  const schema = joi.object({
    title: joi.string().min(3).max(150).required(),
    period: joi.string().valid(...Object.values(Periods)).required(),
    pages: joi.number().integer().min(0).max(10000).required(),
    published_year: joi.number().integer().required(),
    genres: joi.string().valid(...Genres).required(),
    publisher: joi.string().required(),
    details: joi.string().required(),
    author_info: joi.string().required(),
  }).unknown(true);

  return schema.validate(data);
};
