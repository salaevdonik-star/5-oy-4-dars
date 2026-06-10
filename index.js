const express = require('express')
const cors = require('cors');
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require('./router/auth.routes');
require("dotenv").config();
const cookieParser = require("cookie-parser");
const citationRouter = require('./router/citation.routes');
const likeRouter = require('./router/like.routes');
const path = require("path")

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({
  extended: true
}))


connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads/images")))


app.use(authorRouter);
app.use(bookRouter);
app.use(authRouter);
app.use(citationRouter)
app.use(likeRouter)

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
