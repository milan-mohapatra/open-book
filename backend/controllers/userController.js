const ErrorHandler = require("../error-handling/errorHandler")
const catchAsyncErrors = require("../error-handling/catchAsyncErrors")
const sendToken = require("../utils/jwtToken")
const User = require("../database/userModel")
const Product = require("../database/productModel")

// Register User
exports.createAccount = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body

    const user = await User.create({
        name,
        email,
        password,
    })

    sendToken(user, 201, res)
})

// Login
exports.login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    // check both email or password is sended by user
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & password", 400))
    }

    const user = await User.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    const isPasswordMatched = (user.password === password)

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401))
    }

    sendToken(user, 200, res)
})

// Logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out"
    })
})

// Get all user -- Admin
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users,
    })
})

// Get single user -- Admin
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`)
        )
    }

    res.status(200).json({
        success: true,
        user,
    })
})

// update User Role -- Admin
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        )
    }

    res.status(200).json({
        success: true,
        message: `Roles updated to ${user.role} successfully`
    })
})

// Delete a user -- Admin
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        )
    }

    await user.remove()

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    })
})

// Books owned by user 
exports.myBooks = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        )
    }

    const myBooks = user.myBook

    res.status(200).json({
        success: true,
        myBooks,
    })
})

// Remove Book
exports.removeBook = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        )
    }

    console.log(user)
    // user.myBook.pop(req.params.booklink)

    res.status(200).json({
        success: true,
        // myBooks,
    })
})


// Add Book 
exports.addBook = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    const product = await Product.findById(req.params.booklink)

    if (!user) {
        return next(
            new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
        )
    }

    if (!product) {
        return next(
            new ErrorHandler(`book does not exist with Id: ${req.params.booklink}`, 400)
        )
    }

    const book = {
        bookName: product.bookName,
        bookId: product._id
    }

    user.myBook.push(book)

    res.status(200).json({
        success: true,
        user
    })
})