const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { createShop, getShopByUserId, updateShop, getShopByName } = require("../controllers/Shop");

router.post("/createShop", auth, createShop);
router.get("/:name", getShopByName);
router.get("/", auth, getShopByUserId);
router.put("/update", auth, updateShop);

module.exports = router;