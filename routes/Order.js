const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const { createOrder, getAllOrders, orderById, updateOrder, getAllOrdersForUser } = require("../controllers/Order");

router.post("/createOrder", auth, createOrder);
router.get("/:id", getAllOrders);
router.get("/myOrders/:id", auth, getAllOrdersForUser)
router.get("/single/:id", auth, orderById);
router.put("/update", auth, updateOrder);

module.exports = router;