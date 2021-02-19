const router = require("express").Router();
const Cart = require("../models/cart.model");
const CartProduct = require("../models/cartProduct.model");
const authJwt = require("../middlewares/authJwt.middlewares");

const sumCartTotalValue = (products) => {
  let totalSum = 0;

  if (!products.length) {
    return totalSum;
  }

  products.map((product) => (totalSum = totalSum + product.totalPrice));

  return totalSum;
};

router.get("/", authJwt, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ client: userId }).populate({
      path: "products",
      populate: { path: "item" },
    });

    if (cart === null) {
      const newCart = new Cart({
        client: userId,
      });

      await newCart.save();

      return res.status(201).send({ cart: newCart });
    }

    const totalSum = sumCartTotalValue(cart.products);

    res.status(200).send({ cart, totalSum });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/addProductToCart", authJwt, async (req, res) => {
  try {
    const { item, cart, quantity, totalPrice } = req.body;

    const currentCart = await Cart.findOne({ client: req.user._id }).populate({
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

      const cart = await Cart.findOne({ client: req.user._id }).populate({
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

router.delete("/deleteCartProduct", async (req, res) => {
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

router.delete("/deleteAllCartProduct", async (req, res) => {
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
