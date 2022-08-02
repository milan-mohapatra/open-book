const cloudinary = require("cloudinary")
const ErrorHandler = require("../error-handling/errorHandler")
const catchAsyncErrors = require("../error-handling/catchAsyncErrors")
const Product = require("../database/productModel")
const sendToken = require("../utils/jwtToken")

// Create Product -- Admin & Author
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    // const coverImg = await cloudinary.v2.uploader.upload(req.body.coverImg, {
    //     folder: "cover-img",
    //     crop: "scale",
    // })

    // const pdf = await cloudinary.v2.uploader.upload(req.body.pdf, {
    //     folder: "pdf",
    //     pages: true,
    // })

    const { bookName, description, price } = req.body

    const book = await Product.create({
        bookName,
        description,
        price,
        productImage: {
            // public_id: coverImg.public_id,
            // url: coverImg.secure_url,
            public_id: "sample img id",
            url: "sample img link",
        },
        productPDF: {
            // public_id: pdf.public_id,
            // url: pdf.secure_url,
            public_id: " sample pdf id",
            url: "sample pdf link",
        },
        author: req.user.id
    })

    res.status(201).json({
        success: true,
        book
    })
})

// Get All Products
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
    const books = await Product.find()

    res.status(200).json({
        success: true,
        books,
    })
})

// Get All Author Products 
exports.getAllAuthorProducts = catchAsyncErrors(async (req, res, next) => {
    const books = await Product.find({ author: req.body.id })

    res.status(200).json({
        success: true,
        books,
    })
})

// Update Product -- Admin & Author
exports.updateProductDetails = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product -- Admin & Author
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404))
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})