const router = require("express").Router();
const Product = require("../models/product.model");
const Category = require("../models/category.model");
const authJwt = require("../middlewares/authJwt.middlewares");

router.get("/allProducts", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/allCategory", async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).send({ categories });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.get("/productsByCategory/:categoryId", authJwt, async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId }).populate(
      "Category"
    );

    res.status(200).send({ products });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/category", authJwt, async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({
      name,
    });

    await newCategory.save();

    res.status(201).send({ newCategory });
  } catch (error) {
    res.status(500).send({ error });
  }
});

router.post("/addProduct", authJwt, async (req, res) => {
  try {
    const { name, price, image, category } = req.body;

    const newProduct = new Product({
      name,
      price,
      image,
      category,
    });

    await newProduct.save();

    res.status(201).send({ newProduct });
  } catch (error) {
    res.status(500).send({ error });
  }
});

module.exports = router;
