const router = require("express").Router();
const authJwt = require("../middlewares/authJwt.middlewares");
const isAdmin = require("../middlewares/isAdmin.middlewares");
const Product = require("../models/product.model");

router.put("/update/:productId", authJwt, isAdmin, async (req, res) => {
  try {
    const { productId } = req.params;
    const { _id, name, price, image, category } = req.body;

    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      { _id, name, price, image, category }
    );

    await updateProduct.save();

    res.status(200).res({ updateProduct });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "Error while update product" });
  }
});

module.exports = router;
