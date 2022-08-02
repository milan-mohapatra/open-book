const jwt = require("jsonwebtoken")
const catchAsyncErrors = require("../error-handling/catchAsyncErrors")
const User = require("../database/userModel")
const ErrorHandler = require("../error-handling/errorHandler")

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies

    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id)

    next()
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(resource
                    `Role: ${req.user.role} is not allowed to access this resource `,
                    403
                )
            )
        }

        next()
    }
}