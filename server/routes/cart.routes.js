const router = require("express").Router();
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const CartProduct = require("../models/cartProduct.model");
const authJwt = require("../middlewares/authJwt.middlewares");
const sumCartTotalValue = require("../helpers/sumTotal");
const moment = require("moment");

router.get("/", authJwt, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ client: userId })
      .populate({
        path: "products",
        populate: { path: "item" },
      })
      .sort({ createAt: -1 })
      .limit(1);

    const totalSum = cart ? sumCartTotalValue(cart.products) : 0;

    let message;

    if (cart && cart.active === false) {
      const order = await Order.findOne({ client: userId })
        .sort({ createAt: -1 })
        .limit(1);

      message = `Your last order was at: ${moment(order.createAt).format(
        "YYYY-MM-DD"
      )}`;
    } else if (cart === null) {
      message = `Welcome, Enjoy you first shopping expires ${req.user.first_name}`;
    } else if (cart && cart.active) {
      message = `You have open cart form ${moment(cart.createAt).format(
        "YYYY-MM-DD"
      )} with Subtotal of ${totalSum}`;
    }

    if (cart === null || cart.active === false) {
      const newCart = new Cart({
        client: userId,
      });

      await newCart.save();

      return res.status(201).send({ cart: newCart, message, totalSum });
    }

    res.status(200).send({ cart, totalSum, message });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/addProductToCart", authJwt, async (req, res) => {
  try {
    const { item, cart, quantity, totalPrice } = req.body;

    const currentCart = await Cart.findOne({
      client: req.user._id,
      active: true,
    }).populate({
      path: "products",
      populate: { path: "item" },
    });

    const isItemExistIndex = currentCart.products.findIndex(
      (product) => product.item._id == item
    );

    if (isItemExistIndex > -1) {
      await CartProduct.updateMany(
        { _id: currentCart.products[isItemExistIndex]._id },
        {
          $set: {
            quantity:
              quantity + currentCart.products[isItemExistIndex].quantity,
            totalPrice:
              totalPrice + currentCart.products[isItemExistIndex].totalPrice,
          },
        }
      );

      const cart = await Cart.findOne({
        client: req.user._id,
        active: true,
      }).populate({
        path: "products",
        populate: { path: "item" },
      });

      const totalSum = sumCartTotalValue(cart.products);

      return res.status(201).send({ cart: cart, totalSum });
    }

    const newProduct = new CartProduct({
      item,
      cart,
      quantity,
      totalPrice,
    });

    await newProduct.save();

    const newCart = await Cart.findOneAndUpdate(
      { _id: cart },
      { $push: { products: newProduct } },
      {
        new: true,
      }
    ).populate({
      path: "products",
      populate: { path: "item" },
    });

    const totalSum = sumCartTotalValue(newCart.products);

    res.status(201).send({ cart: newCart, totalSum });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/deleteCartProduct", authJwt, async (req, res) => {
  try {
    const { productId, cartId } = req.query;

    await CartProduct.deleteMany({ _id: productId });

    const cart = await Cart.findOne({ _id: cartId }).populate({
      path: "products",
      populate: { path: "item" },
    });

    const totalSum = sumCartTotalValue(cart.products);

    res.status(200).send({ cart, totalSum });
  } catch (error) {
    res.status(500).send({ message: "Error happened" });
  }
});

router.delete("/deleteAllCartProduct", authJwt, async (req, res) => {
  try {
    const { cartId } = req.query;

    await CartProduct.deleteMany({ cart: cartId });

    const cart = await Cart.findOne({ _id: cartId }).populate({
      path: "products",
      populate: { path: "item" },
    });

    res.status(200).send({ cart, totalSum: 0 });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error happened" });
  }
});

module.exports = router;
