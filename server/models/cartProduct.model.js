const { Schema, model } = require("mongoose");

const CartProductSchema = new Schema({
  item: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
});

const CartProduct = model("CartProduct", CartProductSchema);

module.exports = CartProduct;
