const express = require("express")
const router = express.Router()
const { createAccount,
    login,
    logout,
    getAllUser,
    deleteUser,
    getSingleUser,
    updateUserRole,
    myBooks,
    removeBook,
    addBook } = require("../controllers/userController")
const { remove } = require("../database/productModel")
const { isAuthenticatedUser, authorizeRoles } = require("../utils/auth")


router.route("/user/new").post(createAccount)
router.route("/user/login").post(login)
router.route("/user/logout").get(logout)
router.route("/user/mybooks").get(isAuthenticatedUser, myBooks)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser) // -- Admin
router.route("/admin/user/:id") //-- Admin
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser)
router.route("/user/mybooks/:booklink")
    .delete(isAuthenticatedUser, removeBook)
    .put(isAuthenticatedUser, addBook)
module.exports = router