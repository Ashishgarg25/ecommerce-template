const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { createProduct, deleteProduct, updateProduct, getAllProducts, productById } = require("../controllers/Products");

router.post("/createProduct", auth, createProduct);
router.get("/", getAllProducts);
router.get("/single", productById);
router.put("/update", auth, updateProduct);
router.delete("/delete", auth, deleteProduct);

module.exports = router;