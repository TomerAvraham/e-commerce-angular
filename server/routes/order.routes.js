const router = require("express").Router();
const authJwt = require("../middlewares/authJwt.middlewares");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const moment = require("moment");
const sumCartTotalValue = require("../helpers/sumTotal");
const path = require("path");
const fs = require("fs");

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

router.get("/receipt/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({ _id: id }).populate({
      path: "cart",
      populate: { path: "products", populate: { path: "item" } },
    });

    console.log(__dirname);

    let receipt = "";

    for (const product of order.cart.products) {
      receipt += `
        Name: ${product.item.name}, Quantity: ${product.quantity}, TotalPrice: ${product.totalPrice}
      `;
    }

    receipt += `
    ----------------------------------
      TOTAL: ${sumCartTotalValue(order.cart.products)}
    `;

    console.log(receipt);

    fs.writeFile(`${__dirname}/../config/receipt.txt`, receipt, (err) => {
      if (err) {
        return res.status(500).send({ message: "Something went wrong" });
      }
    });

    return res.sendFile(path.resolve(`${__dirname}/../config/receipt.txt`));
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Some thing went wrong." });
  }
});

module.exports = router;
