const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserSchema = require("../schema/user.schema");
const CustomErrorHandler = require("../error/error");

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return next(CustomErrorHandler.BadRequest("Bu email allaqachon ro'yxatdan o'tgan"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserSchema.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Ro'yxatdan o'tish muvaffaqiyatli",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserSchema.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.UnAuthorized("Email yoki parol noto'g'ri"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(CustomErrorHandler.UnAuthorized("Email yoki parol noto'g'ri"));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Kirish muvaffaqiyatli",
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
