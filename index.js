const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db.config");
const authRouter = require("./router/auth.routes");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const errorMiddleware = require("./middleware/error.middleware");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

app.use(authRouter);
app.use(authorRouter);
app.use(bookRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
