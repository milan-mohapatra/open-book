const express = require("express")
const router = express.Router()
const { getAllProducts,
        createProduct,
        updateProductDetails,
        deleteProduct,
        getAllAuthorProducts } = require("../controllers/productController")
const { isAuthenticatedUser, authorizeRoles } = require("../utils/auth")

router.route("/products").get(getAllProducts)
router.route("/author/products").get(isAuthenticatedUser, authorizeRoles("author"), getAllAuthorProducts) // -- Author

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)    // -- Admin
router.route("/author/product/new").post(isAuthenticatedUser, authorizeRoles("author"), createProduct)    // -- Admin

router.route("/admin/products/:id") // -- Admin
        .put(isAuthenticatedUser, authorizeRoles("admin"), updateProductDetails)
        .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct)    

router.route("/author/products/:id") // -- Author
        .put(isAuthenticatedUser, authorizeRoles("author"), updateProductDetails)
        .delete(isAuthenticatedUser, authorizeRoles("author"), deleteProduct)

router.route("/prouduct/pay/:id")

module.exports = router