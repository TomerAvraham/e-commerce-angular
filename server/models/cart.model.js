const { Schema, model } = require("mongoose");

const CartSchema = new Schema({
  active: { type: Boolean, required: true, default: true },
  createAt: { type: Date, default: Date.now },
  client: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "CartProduct" }],
});

const Cart = model("Cart", CartSchema);

module.exports = Cart;
