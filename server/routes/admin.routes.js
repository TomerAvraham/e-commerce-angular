const router = require("express").Router();
const authJwt = require("../middlewares/authJwt.middlewares");
const isAdmin = require("../middlewares/isAdmin.middlewares");
const Product = require("../models/product.model");

router.put("/update/:productId", authJwt, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, price, image, category } = req.body;

    await Product.updateMany(
      { _id: productId },
      { name, price, image, category }
    );

    const products = await Product.find();

    res.status(200).send({ products });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error while update product" });
  }
});

router.post("/addProduct", authJwt, isAdmin, async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const newProduct = new Product({
      name,
      price,
      image,
      category,
    });

    await newProduct.save();

    const products = await Product.find();

    res.status(201).send({ products });
  } catch (error) {
    console.log(err);
    res.status(400).send({ message: "Error while add new product" });
  }
});

module.exports = router;
