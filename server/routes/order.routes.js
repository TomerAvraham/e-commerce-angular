const router = require("express").Router();
const authJwt = require("../middlewares/authJwt.middlewares");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

router.get("/countOrder", async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    res.status(200).send({ orderCount });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong" });
  }
});

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
      delivery_date: delivery_date,
      credit_card: lastFourDigests,
    });

    await newOrder.save();

    res.status(201).send({ success: true, order: newOrder._id });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Some thing went wrong. Please try again" });
  }
});

router.get(
  "/isOrderExistThreeTimes/:deliveryDate",
  authJwt,
  async (req, res) => {
    try {
      const { deliveryDate } = req.params;

      let date = moment(deliveryDate).format();
      date = date.split("T");
      date[1] = "00:00:00+00:00";
      const removeTimezone = date.join("T");

      const orderExistThreeTimes = await Order.find({
        delivery_date: removeTimezone,
      });

      if (orderExistThreeTimes.length >= 3) {
        res.status(200).send({
          orderExistThreeTimes: orderExistThreeTimes[0].delivery_date,
        });
      } else {
        res.status(200).send(null);
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Some thing went wrong. Please try again" });
    }
  }
);

module.exports = router;
