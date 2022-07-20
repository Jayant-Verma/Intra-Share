const express = require("express");
const { isConnected, isAuthenticated } = require("../middlewares/auth");
const {
    createPost,
    likeAndUnlikePost,
    deletePost,
    getPostOfFollowing,
    updateCaption,
    commentOnPost,
    deleteComment,
} = require("../controllers/post");

const router = express.Router();

router.route("/post/upload").post(isConnected, isAuthenticated, createPost);
router
    .route("/post/:id")
    .get(isConnected, isAuthenticated, likeAndUnlikePost)
    .put(isConnected, isAuthenticated, updateCaption)
    .delete(isConnected, isAuthenticated, deletePost);

router.route("/posts").get(isConnected, isAuthenticated, getPostOfFollowing);

router
    .route("/post/comment/:id")
    .put(isConnected, isAuthenticated, commentOnPost)
    .delete(isConnected, isAuthenticated, deleteComment);

module.exports = router;
