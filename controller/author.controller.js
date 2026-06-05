const CustomErrorHandler = require("../error/error");
const AuthorSchema = require("../schema/author.schema");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await AuthorSchema.find();

    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
};

const search = async (req, res, next) => {
  try {
    const { searchingvalue } = req.query

    const authors = await AuthorSchema.find({
      full_name: {$regex: searchingvalue, $options: "i"}
    })

    res.status(200).json(authors);
  } catch (error) {
    next(error)
  }
};

const addAuthor = async (req, res, next) => {
  console.log("So'rov controllerga keldi!")
  try {
    const { full_name, birth_year, death_year, bio, period, work, region, phone_number } =
      req.body;

    await AuthorSchema.create({
      full_name,
      birth_year,
      death_year,
      bio,
      period,
      work,
      region,
      phone_number
    });

    res.status(201).json({
      message: "Added new author",
    });
  } catch (error) {
    next(error)
  }
};

const getOneAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
      throw CustomErrorHandler.NotFound("Author not found")
    }

    res.status(200).json(foundedAuthor);
  } catch (error) {
    next(error)
  }
};

const updateAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { full_name, birth_year, death_year, bio, period, work, region, phone_number } =
      req.body;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
       throw CustomErrorHandler.NotFound("Author not found")
    }

    await AuthorSchema.updateOne({_id: id}, {
      full_name,
      birth_year,
      death_year,
      bio,
      period,
      work,
      region,
      phone_number
    });

    res.status(200).json({  
      message: "Updated author",
    });
  } catch (error) {
    next(error)
  }
};

const deleteAuthor = async (req, res, next) => {
  try {
    const { id } = req.params;

    const foundedAuthor = await AuthorSchema.findById(id);

    if (!foundedAuthor) {
       throw CustomErrorHandler.NotFound("Author not found")
    }

    await AuthorSchema.findByIdAndDelete({_id: id})

    res.status(200).json({   
      message: "Deleted author",
    });
  } catch (error) {
    next(error)
  }
};

module.exports = {
  getAllAuthors,
  getOneAuthor,
  addAuthor,
  updateAuthor,
  deleteAuthor,
  search
};