const Product = require("../models/Product");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createProduct = async (req, res) => {
  try {
    const {
      shop,
      owner,
      name,
      slug,
      description,
      sku,
      quantity,
      media,
      price,
      sale_price,
      tag,
      variants,
      is_best_selling,
      is_new_arrival,
      isActive,
    } = req.body;

    if (
      !shop ||
      !owner ||
      !name ||
      !slug ||
      !description ||
      !sku ||
      !quantity ||
      media.length === 0 ||
      !price ||
      !sale_price
    ) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const product = new Product({
      shop,
      owner,
      name,
      slug,
      description,
      sku,
      quantity,
      media,
      price,
      sale_price,
      tag: tag ?? [],
      variants: variants ?? [],
      is_best_selling: is_best_selling ?? false,
      is_new_arrival: is_new_arrival ?? false,
      isActive,
    });

    const data = await product.save();

    if(!data){
      return res.status(403).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }

    return res.status(500).json({
      variant: "success",
      msg: "Product Added Successfully!",
      data
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      _id,
      shop,
      owner,
      name,
      slug,
      description,
      sku,
      quantity,
      media,
      price,
      sale_price,
      tag,
      variants,
      is_best_selling,
      is_new_arrival,
      isActive,
    } = req.body;

    if (
      !_id ||
      !shop ||
      !owner ||
      !name ||
      !slug ||
      !description ||
      !sku ||
      !quantity ||
      media.length === 0 ||
      !price ||
      !sale_price
    ) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const product = await Product.findById(_id);
    if (!product) {
      return res.status(400).json({
        variant: "error", msg: "No product found!"
      });
    }


    if (name) product.name = name;
    if (slug) product.slug = slug;
    if (description) product.description = description;
    if (sku) product.sku = sku;
    if (quantity) product.quantity = quantity;
    if (price) product.price = price;
    if (sale_price) product.sale_price = sale_price;
    if (is_best_selling) product.is_best_selling = is_best_selling;
    if (is_new_arrival) product.is_new_arrival = is_new_arrival;
    if (isActive) product.isActive = isActive;

    if (tag) {
      if (product.tag.length > 0) {
        await product.update({ _id: product._id }, { $push: { tag: tag } });
      } else product.tag = tag;
    }

    if (media) {
      if (product.media.length > 0) {
        await product.update({ _id: product._id }, { $push: { media: media } });
      } else product.media = media;
    }

    if (variants) {
      if (product.variants.length > 0) {
        await product.update({ _id: product._id }, { $push: { variants: variants } });
      } else product.variants = variants;
    }

    const updatedProduct = await product.save();

    return res.status(201).json({
      response: updatedProduct,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const getAllProducts = async(req, res) => {
  try{
    const { shop } = req.body;

    if(!shop){
      return res.status(400).json({
        variant: "error",
        msg: "No product found!",
      });
    }

    const products = Product.find({ shop: shop })

    if(!products){
      return res.status(400).json({
        variant: "error",
        msg: "No product found!",
      });
    }

    return res.status(201).json({
      response: products,
    });

  } catch (e) {
  console.log(e);
  return res.status(500).json({
    variant: "error",
    msg: "Something went wrong. Please try again!",
  });
}
}

const productById = async(req, res) => {
    try{
      const { shop, _id } = req.body;

      if(!shop || !_id){
        return res.status(400).json({
          variant: "error",
          msg: "No product found!",
        });
      }

      const product = Product.findById({ _id })

      if(!product){
        return res.status(400).json({
          variant: "error",
          msg: "No product found!",
        });
      }

      return res.status(201).json({
        response: product,
      });

    } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
}

const deleteProduct = async (req, res) => {
  try {
    const { shop, _id } = req.body;

    if (!shop || !_id) {
      return res.status(404).json({ variant: "error", msg: "No product found!" });
    }

    const isDeleted = await Product.findOneAndRemove({ _id });

    if (!isDeleted) {
      res.status(403).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }

    console.log(isDeleted);

    return res.status(201).json({
      message: {
        text: `Product Deleted successfully!`,
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
  createProduct,
  updateProduct,
  deleteProduct,
  productById,
  getAllProducts,
};
