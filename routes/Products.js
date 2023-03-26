const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  productById,
  searchProducts,
} = require("../controllers/Products");

router.post("/createProduct", auth, createProduct);
router.get("/:id", getAllProducts);
router.get("/search/:name", searchProducts);
router.get("/single/:id", productById);
router.put("/update", auth, updateProduct);
router.delete("/delete", auth, deleteProduct);

module.exports = router;
