const Blog = require("../models/Blog");

const createBlogPost = async (req, res) => {
  try {
    const { owner, shop, author, title, description, media } =
      req.body;

    if (
      !owner ||
      !shop ||
      !author ||
      !title ||
      !description ||
      media.length === 0
    ) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const post = new Blog({
      owner,
      shop,
      author,
      title,
      description,
      media,
    });

    const data = await post.save();

    if (!data) {
      return res.status(403).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }

    return res.status(500).json({
      variant: "success",
      msg: "Post created Successfully!",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const getAllPostsByShop = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        variant: "error",
        msg: "No posts found!",
      });
    }

    const posts = Blog.find({ shop: id });

    if (!posts) {
      return res.status(400).json({
        variant: "error",
        msg: "No posts found!",
      });
    }

    return res.status(201).json({
      response: posts,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const postById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        variant: "error",
        msg: "No post found!",
      });
    }

    const post = Blog.findById({ _id: id });

    if (!post) {
      return res.status(400).json({
        variant: "error",
        msg: "No post found!",
      });
    }

    return res.status(201).json({
      response: post,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { owner, shop, author, title, description, media } =
      req.body;

    if (
      !owner ||
      !shop ||
      !author ||
      !title ||
      !description ||
      media.length === 0
    ) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const post = await Blog.findById(_id);

    if (!post) {
      return res.status(400).json({
        variant: "error",
        msg: "No posts found!",
      });
    }

    if (author) post.author = author;
    if (title) post.title = title;
    if (title) post.title = title;
    if (description) post.description = description;
    if (media) post.media = media;

    const updatedPost = await post.save();

    return res.status(201).json({
      response: updatedPost,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const { shop, _id } = req.body;

    if (!shop || !_id) {
      return res.status(404).json({ variant: "error", msg: "No post found!" });
    }

    const isDeleted = await Blog.findOneAndRemove({ _id });

    if (!isDeleted) {
      res.status(403).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }

    console.log(isDeleted);

    return res.status(201).json({
      message: {
        text: `Post Deleted successfully!`,
        variant: "success",
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

module.exports = {
  createBlogPost,
  getAllPostsByShop,
  postById,
  updatePost,
  deletePost,
};
