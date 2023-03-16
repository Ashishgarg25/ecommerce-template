const express = require("express");
const { createBlogPost, getAllPostsByShop, postById, deletePost, updatePost } = require("../controllers/Blog");
const router = express.Router();
const auth = require('../middleware/auth');

router.post("/createPost", auth, createBlogPost);
router.get("/:id", getAllPostsByShop);
router.get("/single/:id", postById);
router.put("/update", auth, updatePost);
router.delete("/delete", auth, deletePost);

module.exports = router;