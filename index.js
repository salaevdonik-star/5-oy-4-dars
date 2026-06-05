const express = require('express')
const cors = require('cors');
const connectDB = require("./config/db.config");
const authorRouter = require("./router/author.routes");
const bookRouter = require("./router/book.routes");
const quoteRouter = require("./router/quote.routes");
const errorMiddleware = require("./middleware/error.middleware");
const authRouter = require('./router/auth.routes');
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors())


connectDB();

app.use(authorRouter);
app.use(bookRouter);
app.use(authRouter);
app.use(quoteRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
});
