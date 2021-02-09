const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String },
  ID: { type: Number, minlength: 9 },
  password: { type: String },
  city: { type: String },
  address: { type: String },
  admin: { type: Boolean, default: false },
});

const User = model("user", UserSchema);

module.exports = User;
