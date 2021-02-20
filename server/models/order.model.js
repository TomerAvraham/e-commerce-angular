const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  client: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  createAt: { type: Date, default: Date.now },
  destination_city: { type: String, require: true },
  destination_street: { type: String, require: true },
  delivery_date: { type: Date, required: true },
  credit_card: { type: Number, required: true, length: 4 },
});

const Order = model("Order", OrderSchema);

module.exports = Order;
