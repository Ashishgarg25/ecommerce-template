const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { createShop, getShopByUserId, updateShop } = require("../controllers/Shop");

router.post("/createShop", auth, createShop);
router.get("/", auth, getShopByUserId);
router.put("/update", auth, updateShop);

module.exports = router;