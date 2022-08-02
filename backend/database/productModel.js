const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please Enter product Description"]
    },
    price: {
        type: String,
        required: [true, "Please Enter product Price"]
    },
    productImage: {
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        },
    },
    productPDF: {
        public_id: {
            type: String,
            require: true
        },
        url: {
            type: String,
            require: true
        },
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)