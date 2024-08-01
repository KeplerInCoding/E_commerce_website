const express = require("express");
const { registerUser, loginUser, logoutUser, getUserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, getAllUsers);
router.route("/admin/user/:id").get(isAuthenticatedUser, getSingleUser).put(isAuthenticatedUser, updateUserRole).delete(isAuthenticatedUser, deleteUser);

module.exports = router;