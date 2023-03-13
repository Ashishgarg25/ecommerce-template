const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { createOrder, getAllOrders, orderById, updateOrder } = require("../controllers/Order");

router.post("/createOrder", auth, createOrder);
router.get("/", getAllOrders);
router.get("/single", orderById);
router.put("/update", auth, updateOrder);

module.exports = router;