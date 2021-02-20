const router = require("express").Router();
const authJwt = require("../middlewares/authJwt.middlewares");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");

router.post("/newOrder", authJwt, async (req, res) => {
  try {
    const {
      cart,
      destination_city,
      destination_street,
      delivery_date,
      credit_card,
    } = req.body;

    await Cart.updateMany({ _id: cart }, { active: false });

    const lastFourDigests = credit_card % 10000;

    const newOrder = new Order({
      client: req.user._id,
      cart,
      destination_city,
      destination_street,
      delivery_date,
      credit_card: lastFourDigests,
    });

    await Order.save();

    res.status(201).send({ success: true, message: "Order Success" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Some thing went wrong. Please try again" });
  }
});

module.exports = router;
