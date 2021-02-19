const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, unique: true },
  ID: { type: Number, minlength: 9, unique: true },
  password: { type: String },
  city: { type: String },
  address: { type: String },
  admin: { type: Boolean, default: false },
});

const User = model("User", UserSchema);

module.exports = User;
