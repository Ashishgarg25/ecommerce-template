const Order = require("../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      shop,
      owner,
      owner_email,
      product,
      total,
      shipping_fees,
      discount,
      payment,
      shipping_address,
    } = req.body;

    if (
      !shop ||
      !owner ||
      !owner_email ||
      product.length === 0 ||
      !total ||
      !shipping_fees ||
      !payment ||
      !shipping_address
    ) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const order = new Order({
        shop,
        owner,
        owner_email,
        product,
        total,
        shipping_fees,
        discount,
        payment,
        shipping_address,
        delivery_time,
        status,
    });

    const data = await order.save();

    if (!data) {
      return res.status(403).json({
        variant: "error",
        msg: "Something went wrong. Please try again!",
      });
    }

    return res.status(500).json({
      variant: "success",
      msg: "Order created Successfully!",
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

const updateOrder = async (req, res) => {
  try {
    const {
        shop,
        owner,
        owner_email,
        product,
        total,
        shipping_fees,
        discount,
        payment,
        shipping_address,
        delivery_time,
        status,
    } = req.body;

    if (
        !shop ||
        !owner ||
        !owner_email ||
        product.length === 0 ||
        !total ||
        !shipping_fees ||
        !payment ||
        !shipping_address || !status || !delivery_time
    ) {
      return res
        .status(404)
        .json({ variant: "error", msg: "Please enter mandatory fields!" });
    }

    const order = await Order.findById(_id);
    if (!order) {
      return res.status(400).json({
        variant: "error",
        msg: "No order found!",
      });
    }

    if (status) order.status = status;
    if (delivery_time) order.delivery_time = delivery_time;

    const updatedOrder = await order.save();

    return res.status(201).json({
      response: updatedOrder,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { shop } = req.body;

    if (!shop) {
      return res.status(400).json({
        variant: "error",
        msg: "No orders found!",
      });
    }

    const orders = Order.find({ shop: shop });

    if (!orders) {
      return res.status(400).json({
        variant: "error",
        msg: "No orders found!",
      });
    }

    return res.status(201).json({
      response: orders,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      variant: "error",
      msg: "Something went wrong. Please try again!",
    });
  }
};

const orderById = async (req, res) => {
  try {
    const { shop, _id } = req.body;

    if (!shop || !_id) {
      return res.status(400).json({
        variant: "error",
        msg: "No order found!",
      });
    }

    const order = Order.findById({ _id });

    if (!order) {
      return res.status(400).json({
        variant: "error",
        msg: "No order found!",
      });
    }

    return res.status(201).json({
      response: order,
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
  createOrder,
  updateOrder,
  orderById,
  getAllOrders,
};
