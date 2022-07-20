const express = require("express");
const {
    register,
    login,
    followUser,
    logout,
    updatePassword,
    updateProfile,
    deleteMyProfile,
    myProfile,
    getUserProfile,
    getAllUsers,
    forgotPassword,
    resetPassword,
    getMyPosts,
    getUserPosts,
} = require("../controllers/user");
const { isConnected, isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(isConnected, register);

router.route("/login").post(isConnected, login);

router.route("/logout").get(isConnected, logout);

router.route("/follow/:id").get(isConnected, isAuthenticated, followUser);

router
    .route("/update/password")
    .put(isConnected, isAuthenticated, updatePassword);

router
    .route("/update/profile")
    .put(isConnected, isAuthenticated, updateProfile);

router
    .route("/delete/me")
    .delete(isConnected, isAuthenticated, deleteMyProfile);

router.route("/me").get(isConnected, isAuthenticated, myProfile);

router.route("/my/posts").get(isConnected, isAuthenticated, getMyPosts);

router.route("/userposts/:id").get(isConnected, isAuthenticated, getUserPosts);

router.route("/user/:id").get(isConnected, isAuthenticated, getUserProfile);

router.route("/users").get(isConnected, isAuthenticated, getAllUsers);

router.route("/forgot/password").post(isConnected, forgotPassword);

router.route("/password/reset/:token").put(isConnected, resetPassword);

module.exports = router;
