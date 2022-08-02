const app = require("./app")
const dotenv = require("dotenv")
const cloudinary = require("cloudinary")
const connectDatabase = require("./database/database.js")

// Handling Uncut Exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down server due to Uncut Exceptions`)

    process.exit(1)
})

// Config
dotenv.config({ path: "backend/database/config.env" })

const server = app.listen(process.env.PORT, () => {
    console.log((`Server is working on http://localhost:${process.env.PORT}`))
})

// connecting to database
connectDatabase()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down server due to Unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1)
    })
})
