const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category", require: true },
});

const Product = model("Product", ProductSchema);

module.exports = Product;
