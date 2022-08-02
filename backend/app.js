const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const fileUpload = require("express-fileupload")
const app = express() 
const errorHandlerMiddleware = require("./error-handling/error")

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

// Route Import
const product = require("./routes/productRoute")
const user = require("./routes/userRoute")

app.use("/api/v1/", product)
app.use("/api/v1/", user)

// Middleware for error
app.use(errorHandlerMiddleware)

module.exports = app