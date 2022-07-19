const express = require("express");
const { isAuthenticated } = require("../middlewares/auth");
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

router.route("/post/upload").post(isAuthenticated, createPost);
router
    .route("/post/:id")
    .get(isAuthenticated, likeAndUnlikePost)
    .put(isAuthenticated, updateCaption)
    .delete(isAuthenticated, deletePost);

router.route("/posts").get(isAuthenticated, getPostOfFollowing);

router
    .route("/post/comment/:id")
    .put(isAuthenticated, commentOnPost)
    .delete(isAuthenticated, deleteComment);

module.exports = router;
