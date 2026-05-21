const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db.config")
const authorRouter = require("./router/author.routes")
const bookRouter = require("./router/book.routes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

connectDB()


// Router
app.use(authorRouter) 
app.use(bookRouter)


app.listen(PORT, () => {
  console.log("Server is running at: " + PORT);
})